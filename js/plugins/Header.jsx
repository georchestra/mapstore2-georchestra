/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import { createPlugin } from "@mapstore/utils/PluginsUtils";

const Header = ({page = "mapstore"}) => {
    useEffect(() => {
        document.getElementById("georchestra-header").src = "/header/?active=" + page;
    }, [page]);
    return null;
};

export default createPlugin('Header', {
    component: Header
});
