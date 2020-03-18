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
import {mapSelector} from "@mapstore/selectors/map";
import {layersSelector, rawGroupsSelector} from "@mapstore/selectors/layers";
import { getResourceIdByName, getResourceDataByName, getResource } from '@mapstore/api/persistence';
import { loadMapConfig, MAP_CONFIG_LOADED, MAP_CONFIG_LOAD_ERROR } from '@mapstore/actions/config';
import { pluginsSelectorCreator } from '@mapstore/selectors/localConfig';
import { clearMapTemplates, setTemplates, setMapTemplatesLoaded } from '@mapstore/actions/maptemplates';
import {LOAD_CONTEXT, loadFinished, loading, contextLoadError, setContext, setResource} from "@mapstore/actions/context";
import {loadUserSession, saveMapConfig, USER_SESSION_LOADED, USER_SESSION_REMOVED} from "@mapstore/actions/usersession";
import { Observable } from 'rxjs';
import { wrapStartStop } from '@mapstore/observables/epics';
import ConfigUtils from '@mapstore/utils/ConfigUtils';
import merge from "lodash/merge";

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

const sessionNameSelector = createSelector([contextResourceSelector, userSelector], (context, user) => (context?.id ?? "default") + "." + user?.name ?? "anonymous");
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
export const autoSaveSessionEpic = autoSaveSessionEpicCreator(MAP_CONFIG_LOADED, USER_SESSION_REMOVED, 30 * 1000);
export const loadUserSessionEpic = loadUserSessionEpicCreator(sessionNameSelector);
export const removeUserSessionEpic = removeUserSessionEpicCreator(sessionIdSelector);

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
    return Observable.of(
        saveMapConfig(mapConfig),
        loadMapConfig(configUrl, mapId === 'new' ? null : mapId, mapConfig, undefined, session)
    ).merge(
        action$.ofType(MAP_CONFIG_LOAD_ERROR)
            .switchMap(({ type, error }) => {
                if (type === MAP_CONFIG_LOAD_ERROR) {
                    throw error;
                }

            }).takeUntil(action$.ofType(MAP_CONFIG_LOADED))
    );
};

export const reloadOriginalConfigEpic = (action$, { getState = () => { } } = {}) =>
    action$.ofType(USER_SESSION_REMOVED).switchMap(() => {
        const mapConfig = originalConfigSelector(getState());
        return Observable.of(loadMapConfig(null, null, mapConfig));
    });

/**
 * Handles the load of map and context together.
 * @param {observable} action$ stream of actions
 * @param {object} store
 */
export const loadUserSessionBeforeMapEpic = (action$, { getState = () => { } } = {}) =>
    action$.ofType(LOAD_CONTEXT).switchMap(({mapId, contextName}) => {
        const userName = userSelector(getState())?.name ?? "anonymous";
        return Observable.forkJoin(
            getResourceIdByName('CONTEXT', contextName),
            (mapId ? Observable.of(null) : getResourceDataByName('CONTEXT', contextName))
        ).switchMap(([id, data]) =>
            Observable.of(loadUserSession(id + "." + userName)).merge(
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
