/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import { createPlugin, connect } from "@mapstore/utils/PluginsUtils";

export const Header = ({url = "/header/", page = "mapstore", height = 90, ignoreIFrame = false, script = "https://cdn.jsdelivr.net/gh/georchestra/header@dist/header.js", legacy = false}) => {
    useEffect(() => {
        const header = document.getElementById("georchestra-header");
        const container = document.getElementById("container");
        if (header) {
            // Prevent creation of multiple headers
            const existingGeorHeader = document.getElementsByTagName("geor-header");
            if (existingGeorHeader?.length > 0) {
                existingGeorHeader[0].remove();
            }
            const existingScript = document.querySelectorAll("script[src='" + script + "']");
            if (existingScript?.length > 0) {
                existingScript[0].remove();
            }
            if (!ignoreIFrame && window.location !== window.parent.location) {
                header.style.display = 'none';
                if (container) {
                    container.style.top = '0';
                }
            } else {
                const georHeader = document.createElement("geor-header");
                const georHeaderScript = document.createElement("script");

                georHeader.setAttribute("active-app", page);
                georHeader.setAttribute("legacy-header", false);
                georHeader.setAttribute("legacy-url", url);
                georHeader.setAttribute("legacy-header", legacy);
                georHeaderScript.src = script;
                header.style.height = height + "px";


                header.appendChild(georHeader);
                header.appendChild(georHeaderScript);
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
        legacy: state.localConfig && state.localConfig.header && state.localConfig.header.legacy
    }))(Header)
});
