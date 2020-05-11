/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import additionalsession from "../usersession";
import expect from "expect";
import { SAVE_CONTEXT_CONFIG } from "../../actions/usersession";

describe('usersession', () => {
    it('additionalsession', () => {
        const result = additionalsession({}, {type: SAVE_CONTEXT_CONFIG, config: {
            myContext: {}
        }});
        expect(result.config).toExist();
        expect(result.config.myContext).toExist();
    });
});
