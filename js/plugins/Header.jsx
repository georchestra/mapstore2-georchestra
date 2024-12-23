/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import { createPlugin, connect } from "@mapstore/utils/PluginsUtils";

export const Header = ({ page = "mapstore", height = 80,
    script = "https://cdn.jsdelivr.net/gh/georchestra/header@dist/header.js",
    stylesheet = "", configFile = ""}) => {
    useEffect(() => {
        const header = document.getElementById("georchestra-header");
        const headerScript = document.getElementById("georchestra-header-script");
        const container = document.getElementById("container");
        if (header) {
            header.setAttribute("active-app", page);
            header.setAttribute("stylesheet", stylesheet);
            header.setAttribute("config-file", configFile);
            headerScript.src = script;
            if (container) {
                container.style.top = height + "px";
            }
        }
    }, [page, window.location, window.parent.location]);
    return null;
};

export default createPlugin('Header', {
    component: connect((state) => ({
        script: state.localConfig && state.localConfig.header && state.localConfig.header.script,
        height: state.localConfig && state.localConfig.header && state.localConfig.header.height,
        stylesheet: state.localConfig && state.localConfig.header && state.localConfig.header.stylesheet,
        configFile: state.localConfig && state.localConfig.header && state.localConfig.header.configFile
    }))(Header)
});
