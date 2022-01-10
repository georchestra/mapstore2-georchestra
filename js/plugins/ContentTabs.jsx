/*
 * Copyright 2022, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plugin from '@mapstore/plugins/ContentTabs';
import contenttabsEpics from '@js/epics/contenttabs';


export default {
    ...plugin,
    epics: contenttabsEpics
};
