/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { createPlugin } from "@mapstore/utils/PluginsUtils";

const Header = () => <iframe id="georchestra-header" src="/header/?active=mapstore" scrolling="no" frameBorder="0" />;

export default createPlugin('Header', {
    component: Header
});
