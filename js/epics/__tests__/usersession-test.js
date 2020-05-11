/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { testEpic } from '@mapstore/epics/__tests__/epicTestUtils';
import { restoreAdditionalSession, backupAdditionalConfig, resetAdditionalConfig } from "../usersession";
import { setUserSession, removeUserSession } from "@mapstore/actions/usersession";
import { setResource, SET_CURRENT_CONTEXT } from "@mapstore/actions/context";
import {SET_TEMPLATES, SET_MAP_TEMPLATES_LOADED, CLEAR_MAP_TEMPLATES} from "@mapstore/actions/maptemplates";
import expect from "expect";
import { SAVE_CONTEXT_CONFIG } from '../../actions/usersession';

const session = {
    map: {
        center: {x: 10, y: 40},
        zoom: 5
    },
    context: {
        userPlugins: [{name: "Print"}]
    },
    templates: [{id: 1}]
};

const context = {
    data: {
        userPlugins: [{name: "Print"}],
        templates: [{id: 1}]
    }
};

const initialState = {
    additionalsession: {
        config: {
            templates: [{id: 1}],
            userPlugins: [{name: "Print"}]
        }
    },
    context: {
        currentContext: {
            userPlugins: [{name: "Print", active: true}],
            templates: [{id: 1, favourites: true}]
        }
    }
};

describe('usersession epics', () => {
    it('templates are loaded from saved session', (done) => {
        testEpic(restoreAdditionalSession, 2, setUserSession(session), (actions) => {
            expect(actions[0].type).toBe(SET_TEMPLATES);
            expect(actions[1].type).toBe(SET_MAP_TEMPLATES_LOADED);
        }, {}, done);
    });
    it('templates and user plugins are backed up when setting session', (done) => {
        testEpic(backupAdditionalConfig, 1, setResource(context), (actions) => {
            expect(actions[0].type).toBe(SAVE_CONTEXT_CONFIG);
        }, {}, done);
    });
    it('templates and user plugins are reset', (done) => {
        testEpic(resetAdditionalConfig, 2, removeUserSession(), (actions) => {
            expect(actions[0].type).toBe(CLEAR_MAP_TEMPLATES);
            expect(actions[1].type).toBe(SET_CURRENT_CONTEXT);
        }, initialState, done);
    });
});
