/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SAVE_CONTEXT_CONFIG} from "../actions/usersession";

export default (state = {}, action) => {
    switch (action.type) {
    case SAVE_CONTEXT_CONFIG: {
        return {
            ...state,
            config: action.config
        };
    }
    default:
        return state;
    }
};
