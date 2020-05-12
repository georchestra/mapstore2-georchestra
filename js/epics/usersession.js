/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Observable} from "rxjs";
import {createSelector} from "reselect";
import {SET_USER_SESSION, REMOVE_USER_SESSION} from "@mapstore/actions/usersession";
import {setContext, SET_RESOURCE} from "@mapstore/actions/context";
import {setTemplates, setMapTemplatesLoaded, clearMapTemplates} from "@mapstore/actions/maptemplates";
import {saveUserSessionEpicCreator} from "@mapstore/epics/usersession";
import {userPluginsSelector, currentContextSelector} from "@mapstore/selectors/context";
import {templatesSelector} from "@mapstore/selectors/maptemplates";
import { userSessionToSaveSelector } from "@mapstore/selectors/usersession";
import {saveContextConfig} from "../actions/usersession";

/**
 * usersession save selector:
 *  - map
 *  - user extensions
 *  - map templates
 */
const sessionSelector = createSelector([userSessionToSaveSelector, templatesSelector, userPluginsSelector],
    (session, templates = [], userPlugins) => {
        const {map} = session;
        return {
            map,
            context: {
                userPlugins
            },
            templates
        };
    });

export const restoreAdditionalSession = (action$) =>
    action$.ofType(SET_USER_SESSION).switchMap(({session}) => {
        const templates = session?.templates ?? [];
        return templates.length > 0 ? Observable.of(setTemplates(templates), setMapTemplatesLoaded(true)) :
            Observable.empty();
    });

export const backupAdditionalConfig = (action$) =>
    action$.ofType(SET_RESOURCE).switchMap(({resource}) => {
        const userPlugins = resource.data?.userPlugins ?? [];
        const templates = resource.data?.templates ?? [];
        return Observable.of(saveContextConfig({
            userPlugins,
            templates
        }));
    });

export const resetAdditionalConfig = (action$, state) =>
    action$.ofType(REMOVE_USER_SESSION).switchMap(() => {
        const {userPlugins, templates} = state.getState()?.additionalsession?.config ?? {};
        const context = currentContextSelector(state.getState());
        const actions = (templates ? [clearMapTemplates()] : []).concat(
            userPlugins && context?.userPlugins ? [setContext({
                ...context,
                userPlugins,
                templates
            })] : []
        );
        return Observable.from(actions);
    });

export const saveUserSessionEpic = saveUserSessionEpicCreator(sessionSelector);
