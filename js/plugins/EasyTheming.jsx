/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect} from "react";
import {createPlugin, connect} from "@mapstore/utils/PluginsUtils";

export const Easytheming = ({stylesheet = ""}) => {
    useEffect(() => {
        if (stylesheet) {
            const link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", stylesheet);
            document.head.appendChild(link);
        }
    }, []);
    return null;
};

export default createPlugin('Easytheming', {
    component: connect((state) => ({
        stylesheet: state.localConfig && state.localConfig.stylesheetUri
    }))(Easytheming)
});
