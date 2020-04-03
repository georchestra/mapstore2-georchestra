/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {createSelector} from "reselect";
import {saveUserSessionEpicCreator, autoSaveSessionEpicCreator, loadUserSessionEpicCreator,
    removeUserSessionEpicCreator} from "@mapstore/epics/usersession";
import {contextResourceSelector, userPluginsSelector} from "@mapstore/selectors/context";
import {userSelector, isLoggedIn} from "@mapstore/selectors/security";
import {templatesSelector} from "@mapstore/selectors/maptemplates";
import {mapSelector, projectionDefsSelector} from "@mapstore/selectors/map";
import {layersSelector, rawGroupsSelector} from "@mapstore/selectors/layers";
import { getResourceIdByName, getResourceDataByName, getResource } from '@mapstore/api/persistence';
import { loadMapConfig, configureMap, configureError, mapInfoLoaded, loadMapInfo,
    LOAD_MAP_CONFIG, MAP_CONFIG_LOADED, MAP_CONFIG_LOAD_ERROR } from '@mapstore/actions/config';
import { pluginsSelectorCreator } from '@mapstore/selectors/localConfig';
import { clearMapTemplates, setTemplates, setMapTemplatesLoaded } from '@mapstore/actions/maptemplates';
import {LOAD_CONTEXT, loadFinished, loading, contextLoadError, setContext, setResource} from "@mapstore/actions/context";
import {loadUserSession, saveMapConfig, userSessionStartSaving, userSessionStopSaving,
    USER_SESSION_LOADED, USER_SESSION_REMOVED, USER_SESSION_START_SAVING, USER_SESSION_STOP_SAVING} from "@mapstore/actions/usersession";
import { Observable } from 'rxjs';
import { wrapStartStop } from '@mapstore/observables/epics';
import ConfigUtils from '@mapstore/utils/ConfigUtils';
import merge from "lodash/merge";
import get from "lodash/get";
import { LOCATION_CHANGE } from "connected-react-router";
import axios from '@mapstore/libs/ajax';

function MapError(error) {
    this.originalError = error;
    this.name = 'map';
}
function ContextError(error) {
    this.originalError = error;
    this.name = "context";
}

const errorToMessageId = (name, e, getState = () => {}) => {
    let message = `context.errors.${name}.unknownError`;
    if (e.status === 403) {
        message = `context.errors.${name}.pleaseLogin`;
        if (isLoggedIn(getState())) {
            message = `context.errors.${name}.notAccessible`;
        }
    } if (e.status === 404) {
        message = `context.errors.${name}.notFound`;
    }
    return message;
};

const mapIdSelector = (state) => state.mapInitialConfig?.mapId;

const buildSessionName = (contextId, mapId, userName) => (contextId ?? "default") + (mapId ? "." + mapId : "") + "." + (userName ?? "anonymous");

const sessionNameSelector = createSelector([
    contextResourceSelector,
    mapIdSelector,
    userSelector
], (context, mapId, user) => buildSessionName(context?.id, mapId, user?.name));
const sessionSelector = createSelector([mapSelector, layersSelector, rawGroupsSelector, templatesSelector, userPluginsSelector],
    (map, layers, groups, templates = [], userPlugins) => {
        const {center, zoom} = map;
        return {
            map: {
                center,
                zoom,
                layers,
                groups
            },
            userPlugins,
            templates
        };
    });
const sessionIdSelector = state => state?.usersession?.id;
const originalConfigSelector = state => state?.usersession?.config;
export const saveUserSessionEpic = saveUserSessionEpicCreator(sessionNameSelector, sessionSelector, sessionIdSelector);
export const autoSaveSessionEpic = (interval = 30 * 1000) => autoSaveSessionEpicCreator(USER_SESSION_START_SAVING, USER_SESSION_STOP_SAVING, interval, () => ({type: "END_OF_SESSION_SAVE"}));
export const loadUserSessionEpic = loadUserSessionEpicCreator(sessionNameSelector);
export const removeUserSessionEpic = removeUserSessionEpicCreator(sessionIdSelector);

export const stopSaveSessionEpic = (action$) =>
    action$.ofType(USER_SESSION_REMOVED, LOCATION_CHANGE)
        .switchMap(() => Observable.of(userSessionStopSaving()));

const createContextFlow = (id, session = {}, action$, getState) =>
    (id !== "default"
        ? getResource(id)
            // TODO: setContext should put in ConfigUtils some variables
            // TODO: solve the problem of initial state used to configure plugins partially
            .switchMap((resource) => Observable.of(setResource(resource), setContext(merge({}, resource.data, session))))
        : Observable.of(
            setContext({
                plugins: {
                    desktop: pluginsSelectorCreator("desktop")(getState())
                }
            }) // TODO: select mobile if mobile browser
        )
    ); // TODO: use default context ID

const createMapFlow = (mapId = 'new', mapConfig, session, action$) => {
    const { configUrl } = ConfigUtils.getConfigUrl({ mapId });
    return (mapConfig ? Observable.of(
        saveMapConfig(mapConfig),
        loadMapConfig(configUrl, mapId === 'new' ? null : mapId, mapConfig, undefined, session || {})
    ) : Observable.of(
        loadMapConfig(configUrl, mapId === 'new' ? null : mapId, mapConfig, undefined, session || {})
    )).merge(
        action$.ofType(MAP_CONFIG_LOAD_ERROR)
            .switchMap(({ type, error }) => {
                if (type === MAP_CONFIG_LOAD_ERROR) {
                    throw error;
                }

            }).takeUntil(action$.ofType(MAP_CONFIG_LOADED))
    );
};

/**
 * Epic used to implement user session removal: reloads the original context or map configuration.
 *
 * @param {observable} action$ stream of actions
 * @param {object} store
 */
export const reloadOriginalConfigEpic = (action$, { getState = () => { } } = {}) =>
    action$.ofType(USER_SESSION_REMOVED).switchMap(() => {
        const mapConfig = originalConfigSelector(getState());
        const mapId = getState()?.mapInitialConfig?.mapId;
        return Observable.of(loadMapConfig(null, mapId, mapConfig, undefined, {}), userSessionStartSaving());
    });

/**
 * Override of the context loading epic that introduces loading the user session in the flow.
 * loadContext -> loadUserSession -> loadMap (if mapId is defined) -> start session autosave
 * @param {observable} action$ stream of actions
 * @param {object} store
 */
export const loadUserSessionBeforeContextEpic = (action$, { getState = () => { } } = {}) =>
    action$.ofType(LOAD_CONTEXT).switchMap(({mapId, contextName}) => {
        const userName = userSelector(getState())?.name;
        return Observable.forkJoin(
            getResourceIdByName('CONTEXT', contextName),
            (mapId ? Observable.of(null) : getResourceDataByName('CONTEXT', contextName))
        ).switchMap(([id, data]) =>
            Observable.of(loadUserSession(buildSessionName(id, mapId, userName))).merge(
                action$.ofType(USER_SESSION_LOADED).switchMap(({session}) => {
                    const mapSession = session?.map && {
                        map: session.map
                    };
                    const contextSession = session?.userPlugins && {
                        userPlugins: session.userPlugins
                    };
                    const templates = session?.templates ?? [];
                    return Observable.merge(
                        Observable.of(clearMapTemplates()),
                        createContextFlow(id, contextSession, action$, getState).catch(e => {throw new ContextError(e); }),
                        createMapFlow(mapId, data && data.mapConfig, mapSession, action$, getState).catch(e => { throw new MapError(e); }),
                        templates.length > 0 ? Observable.of(setTemplates(templates), setMapTemplatesLoaded(true)) : Observable.empty(),
                        Observable.of(userSessionStartSaving()),
                        Observable.of(loading(false, "loading")),
                        Observable.of(loadFinished())
                    );
                })
            )
                .let(
                    wrapStartStop(
                        loading(true, "loading"),
                        [],
                        e => {
                            const messageId = errorToMessageId(e.name, e.originalError, getState);
                            // prompt login should be triggered here
                            return Observable.of(contextLoadError({ error: {...e.originalError, messageId} }) );
                        }
                    )
                )
        );
    });


/**
 * Standard map loading flow.
 * Improves thethe standard MapStore config epics,
 * to support saving actual map config so that we can restore it .
 */
const mapFlowWithSessionLoaded = (configName, mapId, config, mapInfo, store, overrideConfig = {}) => {
    // delay here is to postpone map load to ensure that
    // certain epics always function correctly
    // i.e. FeedbackMask disables correctly after load
    // TODO: investigate the root causes of the problem and come up with a better solution, if possible
    return (
        config ?
            Observable.of({data: merge({}, config, overrideConfig), isContextOrSession: true}).delay(100) :
            Observable.defer(() => axios.get(configName)))
        .switchMap(response => {
            // added !config in order to avoid showing login modal when a new.json mapConfig is used in a public context
            if (configName === "new.json" && !config && !isLoggedIn(store.getState())) {
                return Observable.of(configureError({status: 403}));
            }
            if (typeof response.data === 'object') {
                const projectionDefs = projectionDefsSelector(store.getState());
                const projection = get(response, "data.map.projection", "EPSG:3857");
                if (projectionDefs.concat([{code: "EPSG:4326"}, {code: "EPSG:3857"}, {code: "EPSG:900913"}]).filter(({code}) => code === projection).length === 0) {
                    return Observable.of(configureError({messageId: `map.errors.loading.projectionError`, errorMessageParams: {projection}}, mapId));
                }
                const mapConfig = merge({}, response.data, overrideConfig);
                return mapId ? Observable.of(
                    configureMap(mapConfig, mapId),
                    mapInfo ? mapInfoLoaded(mapInfo) : loadMapInfo(mapId),
                    ...(response.isContextOrSession ? [] : [saveMapConfig(response.data)])
                ) :
                    Observable.of(
                        configureMap(mapConfig, mapId),
                        ...(mapInfo ? [mapInfoLoaded(mapInfo)] : []),
                        ...(response.isContextOrSession ? [] : [saveMapConfig(response.data)])
                    );
            }
            try {
                const data = JSON.parse(response.data);
                const mapConfig = merge({}, data, overrideConfig);
                return mapId ? Observable.of(configureMap(mapConfig, mapId), mapInfo ? mapInfoLoaded(mapInfo) : loadMapInfo(mapId)) :
                    Observable.of(
                        configureMap(mapConfig, mapId),
                        ...(mapInfo ? [mapInfoLoaded(mapInfo)] : []),
                        ...(response.isContextOrSession ? [] : saveMapConfig(data))
                    );
            } catch (e) {
                return Observable.of(configureError('Configuration file broken (' + configName + '): ' + e.message, mapId));
            }
        })
        .catch((e) => Observable.of(configureError(e, mapId)));
};

/**
 * Override of the map loading epic that introduces loading the user session in the flow.
 * The user session is loaded only if the flow is not started by the load context epic,
 * because in that case the session is already loaded by that epic; this happened if
 * overrideConfig is defined.
 *
 * overrideConfig -> standard map loading flow
 * !overrideConfig -> loadUserSession -> loadMap -> start session autosave
 * @param {observable} action$ stream of actions
 * @param {object} store
 */
export const loadUserSessionBeforeMapEpic = (action$, store) =>
    action$.ofType(LOAD_MAP_CONFIG)
        .switchMap(({configName, mapId, config, mapInfo, overrideConfig}) => {
            if (overrideConfig) {
                return mapFlowWithSessionLoaded(configName, mapId, config, mapInfo, store, overrideConfig);
            }
            const userName = userSelector(store.getState())?.name;
            return Observable.of(loadUserSession(buildSessionName(null, mapId, userName))).merge(
                action$.ofType(USER_SESSION_LOADED).switchMap(({session}) => {
                    const mapSession = session?.map && {
                        map: session.map
                    };
                    return Observable.merge(
                        mapFlowWithSessionLoaded(configName, mapId, config, mapInfo, store, mapSession),
                        Observable.of(userSessionStartSaving())
                    );
                })
            );
        }
        );
