/*
 * Copyright 2022, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import Rx from 'rxjs';
import {
    SEARCH_FILTER_CHANGED, SEARCH_FILTER_CLEAR_ALL
} from '@mapstore/actions/maps';
import { setTabsHidden } from '@mapstore/actions/contenttabs';
import {
    loadMapsEpic,
    reloadMapsEpic,
    getMapsResourcesByCategoryEpic,
    loadMapsOnSearchFilterChange,
    mapsLoadContextsEpic,
    mapsSetupFilterOnLogin,
    deleteMapAndAssociatedResourcesEpic,
    mapSaveMapResourceEpic
} from '@mapstore/epics/maps';

export const hideTabsOnSearchFilterChange = (action$) =>
    action$.ofType(SEARCH_FILTER_CHANGED, SEARCH_FILTER_CLEAR_ALL)
        .filter(({filter}) => !filter || filter === 'contexts')
        .switchMap(({filterData}) => Rx.Observable.of(
            setTabsHidden(
                (filterData || []).length === 0 ? {
                    geostories: false,
                    dashboards: false,
                    contexts: false
                } : {
                    geostories: true,
                    dashboards: true,
                    contexts: true
                }
            )
        ));

export default {
    loadMapsEpic,
    reloadMapsEpic,
    getMapsResourcesByCategoryEpic,
    loadMapsOnSearchFilterChange,
    hideTabsOnSearchFilterChange,
    mapsLoadContextsEpic,
    mapsSetupFilterOnLogin,
    deleteMapAndAssociatedResourcesEpic,
    mapSaveMapResourceEpic
};
