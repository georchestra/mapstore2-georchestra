/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import productPlugins from '@mapstore/product/plugins';

import NotAllowedPlugin from "@js/plugins/NotAllowed";
import HeaderPlugin from "@js/plugins/Header";
import UserSessionPlugin from "@js/plugins/UserSession";
import VersionPlugin from "@js/plugins/Version";

const exclude = [
    "AboutPlugin", "AttributionPlugin", "FooterPlugin", "ForkPlugin",
    "HomeDescriptionPlugin", "MadeWithLovePlugin", "MapTypePlugin", "NavMenuPlugin"
];

/**
  * Please, keep them sorted alphabetically
 */
export default {
    plugins: {
        ...(Object.keys(productPlugins.plugins).reduce(
            (prev, el) => exclude.includes(el) ? prev : {...prev, [el]: productPlugins.plugins[el]}, {}
        )),
        // georchestra plugins2
        NotAllowedPlugin,
        HeaderPlugin,
        UserSessionPlugin,
        VersionPlugin
    },
    requires: productPlugins.requires
};
