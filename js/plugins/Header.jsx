/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useEffect} from "react";
import { createPlugin, connect } from "@mapstore/utils/PluginsUtils";

export const Header = ({url = "/header/", page = "mapstore", height = 90,
    script = "https://cdn.jsdelivr.net/gh/georchestra/header@dist/header.js",
    legacy = false,
    logoUrl = "https://www.georchestra.org/public/georchestra-logo.svg",
    stylesheet = "", configFile = ""}) => {
    useEffect(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = script;
        scriptTag.async = true;
        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [script]);
    return <>

        <geor-header
            active-app={page}
            legacy-url={url}
            legacy-header={legacy}
            logo-url={logoUrl}
            stylesheet={stylesheet}
            config-file={configFile}
            height={height}
            id="georchestra-header"
        ></geor-header>
    </>;
};

export default createPlugin('Header', {
    component: connect((state) => ({
        url: state.localConfig && state.localConfig.header && state.localConfig.header.url,
        height: state.localConfig && state.localConfig.header && state.localConfig.header.height,
        script: state.localConfig && state.localConfig.header && state.localConfig.header.script,
        legacy: state.localConfig && state.localConfig.header && state.localConfig.header.legacy,
        logoUrl: state.localConfig && state.localConfig.header && state.localConfig.header.logoUrl,
        stylesheet: state.localConfig && state.localConfig.header && state.localConfig.header.stylesheet,
        configFile: state.localConfig && state.localConfig.header && state.localConfig.header.configFile
    }))(Header)
});
