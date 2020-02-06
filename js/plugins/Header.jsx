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
        const container = document.getElementById("container");
        if (header) {
            if (window.location !== window.parent.location) {
                header.style.display = 'none';
                if (container) {
                    container.style.top = '0';
                }
            } else {
                header.style.display = 'block';
                header.src = url + "?active=" + page;
                header.style.height = height + "px";

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
        height: state.localConfig && state.localConfig.header && state.localConfig.header.height
    }))(Header)
});
