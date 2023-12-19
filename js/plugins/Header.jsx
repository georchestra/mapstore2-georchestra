/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import { createPlugin, connect } from "@mapstore/utils/PluginsUtils";

export const Header = ({url = "/header/", page = "mapstore", height = 90, ignoreIFrame = false,
    script = "https://cdn.jsdelivr.net/gh/georchestra/header@dist/header.js",
    legacy = false,
    logo = "https://www.georchestra.org/public/georchestra-logo.svg",
    stylesheet = ""}) => {
    useEffect(() => {
        const header = document.getElementById("georchestra-header");
        const headerScript = document.getElementById("georchestra-header-script");
        const container = document.getElementById("container");
        if (header) {
            if (!ignoreIFrame && window.location !== window.parent.location) {
                header.style.display = 'none';
                if (container) {
                    container.style.top = '0';
                }
            } else {
                header.setAttribute("active-app", page);
                header.setAttribute("legacy-url", url);
                header.setAttribute("legacy-header", legacy);
                header.setAttribute("style", `height:${height}px`);
                header.setAttribute("logo-url", logo);
                header.setAttribute("stylesheet", stylesheet);
                headerScript.src = script;

                if (container) {
                    container.style.top = height + "px";
                }
            }

        }
    }, [page, url, height, window.location, window.parent.location]);
    return null;
};

export default createPlugin('Header', {
    component: connect((state) => ({
        url: state.localConfig && state.localConfig.header && state.localConfig.header.url,
        height: state.localConfig && state.localConfig.header && state.localConfig.header.height,
        script: state.localConfig && state.localConfig.header && state.localConfig.header.script,
        legacy: state.localConfig && state.localConfig.header && state.localConfig.header.legacy,
        logo: state.localConfig && state.localConfig.header && state.localConfig.header.logo,
        stylesheet: state.localConfig && state.localConfig.header && state.localConfig.header.stylesheet
    }))(Header)
});
