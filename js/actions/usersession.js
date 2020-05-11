/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const SAVE_CONTEXT_CONFIG = "USER_SESSION:ORIGINAL_CONTEXT_CONFIG";
export const saveContextConfig = (config) => ({type: SAVE_CONTEXT_CONFIG, config});
