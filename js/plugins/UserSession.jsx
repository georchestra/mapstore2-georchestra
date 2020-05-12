/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {saveUserSessionEpic, restoreAdditionalSession, backupAdditionalConfig, resetAdditionalConfig} from "../epics/usersession";
import additionalsession from "../reducers/usersession";

/**
 * Override of the standard UserSession plugin,
 * with a saveSessionEpic reconfigured to save the following additional state:
 *  - user extensions status
 *  - map templates favourites
 * We also added the restoreAdditionalSession epic to restore the same on session load
 */
import UserSessionPlugin from "@mapstore/plugins/UserSession";
UserSessionPlugin.epics = {...UserSessionPlugin.epics, saveUserSessionEpic, restoreAdditionalSession, backupAdditionalConfig,
    resetAdditionalConfig};
UserSessionPlugin.reducers = {...UserSessionPlugin.reducers, additionalsession};
export default UserSessionPlugin;

