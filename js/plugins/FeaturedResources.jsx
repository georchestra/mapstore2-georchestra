/*
* Copyright 2018, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import {defaultProps, compose, mapPropsStream} from 'recompose';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {NavItem, Glyphicon} from 'react-bootstrap';
import { setFeaturedMapsEnabled} from '@mapstore/actions/maps';

import Message from "@mapstore/components/I18N/Message";
import mapsEpics from '@mapstore/epics/maps';
import {userRoleSelector} from '@mapstore/selectors/security';
import {versionSelector} from '@mapstore/selectors/version';
import {mapTypeSelector} from '@mapstore/selectors/maptype';
import {invalidationSelector, searchTextSelector, isFeaturedMapsEnabled} from '@mapstore/selectors/featuredmaps';
import {loadPage, updateItemsLifecycle} from '@mapstore/components/maps/enhancers/featuredMaps';
import gridPagination from '@mapstore/components/misc/enhancers/gridPagination';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';

import FeaturedResourcesGrid from '@js/plugins/featuredresources/FeaturedResourcesGrid';
import {scrollIntoViewId} from '@mapstore/utils/DOMUtil';

import featuredmaps from '@mapstore/reducers/featuredmaps';
import maptype from '@mapstore/reducers/maptype';
import {DASHBOARD_DEFAULT_SHARE_OPTIONS, GEOSTORY_DEFAULT_SHARE_OPTIONS} from '@mapstore/utils/ShareUtils';
import { editContext } from "@mapstore/actions/contextmanager";

const ToolTipedNavItem = tooltip(NavItem);

const PAGE_SIZE = 4;

class FeaturedResources extends React.Component {

    static propTypes = {
        mapType: PropTypes.string,
        items: PropTypes.array,
        colProps: PropTypes.object,
        fluid: PropTypes.bool,
        bottom: PropTypes.node,
        className: PropTypes.string,
        previousItems: PropTypes.array,
        enableFeaturedMaps: PropTypes.func,
        version: PropTypes.string,
        showAPIShare: PropTypes.bool,
        shareOptions: PropTypes.object,
        shareToolEnabled: PropTypes.bool,
        onEditData: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        shareToolEnabled: true,
        onEditData: () => {}
    }

    UNSAFE_componentWillMount() {
        this.props.enableFeaturedMaps(true);
    }

    getShareOptions = (res) => {
        const categoryName = res.category?.name;
        const shareOptions = this.props.shareOptions && categoryName
            && this.props.shareOptions[categoryName.toLowerCase()];

        if (categoryName === 'GEOSTORY') {
            return shareOptions || GEOSTORY_DEFAULT_SHARE_OPTIONS;
        }

        if (categoryName === 'MAP') {
            return shareOptions || {
                embedPanel: true
            };
        }

        if (categoryName === 'DASHBOARD') {
            return shareOptions || DASHBOARD_DEFAULT_SHARE_OPTIONS;
        }

        return {
            embedPanel: false
        };
    }

    render() {
        const items = this.props.items.length > 0 && this.props.items || this.props.previousItems || [];
        return (
            <FeaturedResourcesGrid
                id="ms-featured-maps"
                fluid={this.props.fluid}
                className={this.props.className}
                title={<h3><Message msgId="manager.featuredMaps" /></h3>}
                resources={items}
                colProps={this.props.colProps}
                version={this.props.version}
                viewerUrl={(res) => this.context.router.history.push('/' + this.makeShareUrl(res).url)}
                getShareUrl={this.makeShareUrl}
                shareOptions={this.getShareOptions} // TODO: share options depending on the content type
                shareToolEnabled={this.props.shareToolEnabled}
                editDataEnabled={(res) => { return res?.category?.name === 'CONTEXT';}}
                onEditData={this.props.onEditData}
                bottom={this.props.bottom}
                style={items.length === 0 ? {display: 'none'} : {}}/>
        );
    }

    makeShareUrl = (res) => {
        if (res.category && res.category.name === "DASHBOARD") {
            return {
                url: `dashboard/${res.id}`,
                shareApi: false
            };
        }
        if (res.category && res.category.name === "GEOSTORY") {
            return {
                url: `geostory/${res.id}`,
                shareApi: false
            };
        }
        if (res.category && res.category.name === "CONTEXT") {
            return {
                url: `context/${res.name}`,
                shareApi: false
            };
        }
        return {
            url: res.contextName ?
                "context/" + res.contextName + "/" + res.id :
                "viewer/" + this.props.mapType + "/" + res.id,
            shareApi: this.props.showAPIShare

        };
    }
}

const featuredResourcesPluginSelector = createSelector([
    mapTypeSelector,
    userRoleSelector,
    state => state.browser && state.browser.mobile,
    searchTextSelector,
    invalidationSelector,
    isFeaturedMapsEnabled,
    versionSelector
], (mapType, role, isMobile, searchText, invalidate, isFeaturedEnabled, version) => ({
    mapType,
    role,
    permission: role === 'ADMIN',
    pagination: isMobile ? 'virtual-scroll-horizontal' : 'show-more',
    searchText,
    invalidate,
    isFeaturedEnabled,
    version
}));

const updateFeaturedMapsStream = mapPropsStream(props$ =>
    props$.merge(props$.take(1).switchMap(({searchText = '', permission, viewSize, pageSize, loadFirst = () => {} }) => {
        return props$
            .startWith({searchText, permission, viewSize, pageSize, loading: true})
            .distinctUntilChanged((previous, next) =>
                previous.invalidate === next.invalidate
                && previous.searchText === next.searchText
                && previous.permission === next.permission
                && previous.role === next.role
            )
            .do(({permission: newPermission, viewSize: newViewSize, searchText: newSearchText, pageSize: newPageSize} = {}) =>
                loadFirst({permission: newPermission, viewSize: newViewSize, searchText: newSearchText, pageSize: newPageSize})
            )
            .ignoreElements();
    })));

/**
 * FeaturedResources plugin. Shows featured resources in a grid.
 * Typically used in the {@link #pages.Maps|home page}.
 * @name FeaturedResources
 * @prop {string} cfg.pageSize change the page size (only desktop)
 * @prop {object} cfg.shareOptions configuration applied to share panel grouped by category name
 * @prop {boolean} cfg.shareToolEnabled default true. Flag to show/hide the "share" button on the item.
 * @memberof plugins
 * @class
 * @example
 * {
 *   "name": "FeaturedResources",
 *   "cfg": {
 *     "shareOptions": {
 *       "pageSize": 6,
 *       "dashboard": {
 *         "embedPanel": false
 *       }
 *     }
 *   }
 * }
 */

const FeaturedResourcesPlugin = compose(
    connect(featuredResourcesPluginSelector, {
        enableFeaturedMaps: setFeaturedMapsEnabled,
        onEditData: (res) => {
            switch (res?.category?.name) {
            case "CONTEXT":
                return editContext(res);
            default:
                return () => {};
            }
        }
    }),
    defaultProps({
        mapType: 'leaflet',
        onGoToMap: () => {},
        fluid: false,
        mapsOptions: {start: 0, limit: 12},
        colProps: {
            xs: 12,
            sm: 6,
            lg: 3,
            md: 4,
            className: 'ms-map-card-col'
        },
        showAPIShare: true,
        items: [],
        pageSize: PAGE_SIZE,
        skip: 0,
        total: 0,
        viewSize: PAGE_SIZE,
        onChangeSize: () => {},
        onLoadMore: () => {},
        loading: false,
        className: '',
        previousItems: [],
        searchText: ''
    }),
    gridPagination({loadPage, pageSize: PAGE_SIZE}),
    updateItemsLifecycle,
    updateFeaturedMapsStream
)((FeaturedResources));

const LabeledNavItem = connect(featuredResourcesPluginSelector)(({ isFeaturedEnabled }) =>
    isFeaturedEnabled ? (<NavItem
        target="_blank"
        onClick={() => scrollIntoViewId('ms-featured-maps')}
    >
        <Message msgId="manager.featuredMaps" />
    </NavItem>) : null);

const IconNavItem = connect(featuredResourcesPluginSelector)(({ isFeaturedEnabled }) =>
    isFeaturedEnabled ? (<ToolTipedNavItem
        target="_blank"
        tooltip={<Message msgId="manager.featuredMaps" />}
        tooltipPosition="bottom"
        onClick={() => scrollIntoViewId('ms-featured-maps')}
    >
        <Glyphicon glyph="star" />
    </ToolTipedNavItem>) : null);

export default {
    FeaturedResourcesPlugin: assign(FeaturedResourcesPlugin, {
        NavMenu: {
            position: 1,
            labelComponent: <LabeledNavItem key="featured-maps-label"/>,
            iconComponent: <IconNavItem key="featured-maps-icon"/>
        }
    }),
    epics: {
        ...mapsEpics
    },
    reducers: {
        featuredmaps,
        maptype
    }
};
