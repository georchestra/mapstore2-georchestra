/*
* Copyright 2022, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/


import plugin from '@mapstore/plugins/Maps';
import mapsEpics from '@js/epics/maps';

/**
 * Plugin for maps resources browsing.
 * Can be rendered inside {@link #plugins.ContentTabs|ContentTabs} plugin
 * and adds an entry to the {@link #plugins.NavMenu|NavMenu}
 * @name Maps
 * @memberof plugins
 * @class
 * @prop {boolean} cfg.showCreateButton default true. Flag to show/hide the button "create a new one" when there is no dashboard yet.
 */
export default {
    ...plugin,
    epics: {
        ...mapsEpics
    }
};
