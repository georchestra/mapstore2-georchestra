/**
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assign from "object-assign";
import ConfigUtils from "@mapstore/utils/ConfigUtils";
import appCfg from "@mapstore/product/appConfig";
import plugins from "./plugins";
import main from "@mapstore/product/main";
import Login from "./plugins/Login";
import AuthenticationAPI from "@mapstore/api/GeoStoreDAO";

/**
 * Add custom (overriding) translations with:
 *
 * ConfigUtils.setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
 */
ConfigUtils.setConfigProp("translationsPath", [
    "./MapStore2/web/client/translations",
    "./translations"
]);
ConfigUtils.setConfigProp("themePrefix", "GeOrchestra");
ConfigUtils.setConfigProp("geoStoreUrl", "rest/geostore/");
/**
 * Use a custom plugins configuration file with:
 *
 * ConfigUtils.setLocalConfigurationFile('localConfig.json');
 */
ConfigUtils.setLocalConfigurationFile("rest/config/load/localConfig.json");
/* ConfigUtils.setConfigProp(
    "extensionsRegistry",
    "rest/config/load/extensions.json"
);*/

/**
 * Use a custom application configuration file with:
 *
 * const appConfig = require('./appConfig');
 *
 * Or override the application configuration file with (e.g. only one page with a mapviewer):
 *
 * const appConfig = assign({}, require('@mapstore/product/appConfig'), {
 *     pages: [{
 *         name: "mapviewer",
 *         path: "/",
 *         component: require('@mapstore/product/pages/MapViewer')
 *     }]
 * });
 */
const appConfig = assign({}, appCfg, {
    pages: [
        {
            name: "mapviewer",
            path: "/",
            component: require("@mapstore/product/pages/MapViewer")
        },
        {
            name: "mapviewer",
            path: "/viewer/:mapType/:mapId",
            component: require("@mapstore/product/pages/MapViewer")
        },
        {
            name: "maps",
            path: "/maps",
            component: require("@mapstore/product/pages/Maps")
        },
        {
            name: "admin",
            path: "/admin",
            component: require("./pages/Admin").default
        },
        {
            name: "context-creator",
            path: "/context-creator/:contextId",
            component: require("./pages/ContextCreator").default
        },
        {
            name: "context",
            path: "/context/:contextName",
            component: require("@mapstore/product/pages/Context").default
        },
        {
            name: "context",
            path: "/context/:contextName/:mapId",
            component: require("@mapstore/product/pages/Context").default
        }
    ]
});
/**
 * Define a custom list of plugins with:
 *
 * const plugins = require('./plugins');
 */
const appPlugins = {
    plugins: {
        ...plugins.plugins,
        // to test with a normal geostore (without cas) you can remove this
        // override and configure the dev-server and security rules accordingly
        LoginPlugin: Login
    },
    requires: plugins.requires
};

const start = userInfo => {
    localStorage.setItem(
        "mapstore2.persist.security",
        JSON.stringify(userInfo)
    );
    main(appConfig, appPlugins);
};

AuthenticationAPI.login("", "")
    .then(userDetails => {
        const timestamp = (new Date() / 1000) | 0;
        const userInfo = {
            user: userDetails.User,
            token: userDetails.access_token,
            refresh_token: userDetails.refresh_token,
            expires: userDetails.expires
                ? timestamp + userDetails.expires
                : timestamp + 48 * 60 * 60,
            authHeader: ""
        };
        start(userInfo);
    })
    .catch(e => {
        // anonymous
        start({
            loginError: e
        });
    });
