/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import { createPlugin, connect } from "@mapstore/utils/PluginsUtils";

export const Header = ({url = "/header/", page = "mapstore", height = 90}) => {
    useEffect(() => {
        const header = document.getElementById("georchestra-header");
        if (header) {
            header.src = url + "?active=" + page;
            header.style.height = height + "px";
        }
        const container = document.getElementById("container");
        if (container) {
            container.style.top = height + "px";
        }
    }, [page, url, height]);
    return null;
};

export default createPlugin('Header', {
    component: connect((state) => ({
        url: state.localConfig && state.localConfig.header && state.localConfig.header.url,
        height: state.localConfig && state.localConfig.header && state.localConfig.header.height
    }))(Header)
});
