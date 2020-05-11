/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {saveContextConfig, SAVE_CONTEXT_CONFIG} from "../usersession";
import expect from "expect";

describe('usersession', () => {
    it('saveContextConfig', () => {
        const result = saveContextConfig({
            myContext: {}
        });
        expect(result.type).toBe(SAVE_CONTEXT_CONFIG);
        expect(result.config).toExist();
        expect(result.config.myContext).toExist();
    });
});
