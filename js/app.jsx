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

/**
 * Add custom (overriding) translations with:
 *
 * ConfigUtils.setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
 */
ConfigUtils.setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
ConfigUtils.setConfigProp('themePrefix', 'GeOrchestra');

/**
 * Use a custom plugins configuration file with:
 *
 * ConfigUtils.setLocalConfigurationFile('localConfig.json');
 */
ConfigUtils.setLocalConfigurationFile('localConfig.json');

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
    pages: [{
        name: "mapviewer",
        path: "/",
        component: require('@mapstore/product/pages/MapViewer')
    }, {
        name: "admin",
        path: "/admin",
        component: require('./pages/Admin').default
    }],
    storeOpts: {
        persist: {
            // we don't want security to be persisted, so that we get updated headers for each reload
            whitelist: []
        }
    }
});
/**
 * Define a custom list of plugins with:
 *
 * const plugins = require('./plugins');
 */
const appPlugins = {
    plugins: {
        ...plugins.plugins,
        LoginPlugin: Login
    },
    requires: plugins.requires
};

main(appConfig, appPlugins);
