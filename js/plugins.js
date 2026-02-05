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
import EasyTheming from "@js/plugins/EasyTheming";
import UserSessionPlugin from "@js/plugins/UserSession";
import VersionPlugin from "@js/plugins/Version";
import MapStoreLogin from '@mapstore/plugins/Login';
import BackgroundSelectorPlugin from '@mapstore/plugins/BackgroundSelector';
const exclude = [
    "AboutPlugin", "AttributionPlugin", "FooterPlugin", "ForkPlugin",
    "LoginPlugin",
    "HomeDescriptionPlugin", "MadeWithLovePlugin", "MapTypePlugin", "NavMenuPlugin",
    "BackgroundSelectorPlugin"
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
        MapStoreLogin,
        NotAllowedPlugin,
        HeaderPlugin,
        EasyTheming,
        UserSessionPlugin,
        VersionPlugin,
        BackgroundSelectorPlugin // This is not lazy loaded because of this issue. https://github.com/georchestra/mapstore2-georchestra/issues/573
    },
    requires: productPlugins.requires
};
