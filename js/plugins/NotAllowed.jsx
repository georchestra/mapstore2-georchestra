/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { createPlugin } from "@mapstore/utils/PluginsUtils";
import Message from "@mapstore/components/I18N/Message";

export default createPlugin('NotAllowed', {
    component: () => <div className="georchestra-notallowed"><Message msgId="georchestra.pageNotAllowed"/></div>
});
