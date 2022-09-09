/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {toModulePlugin} from "@mapstore/utils/ModulePluginsUtils";

import Context from "@mapstore/plugins/Context";
import ContextCreator from "@mapstore/plugins/ContextCreator";
import Dashboard from "@mapstore/plugins/Dashboard";
import Dashboards from "@mapstore/plugins/Dashboards";
import FeedbackMask from '@mapstore/plugins/FeedbackMask';
import GeoStory from "@mapstore/plugins/GeoStory";
import GeoStories from "@mapstore/plugins/GeoStories";
import Maps from "@mapstore/plugins/Maps";
import RulesDataGrid from "@mapstore/plugins/RulesDataGrid";
import RulesEditor from "@mapstore/plugins/RulesEditor";
import RulesManagerFooter from "@mapstore/plugins/RulesManagerFooter";
import Print from "@mapstore/plugins/Print";

/**
  * Please, keep them sorted alphabetically
 */
export default {
    plugins: {
        // ### STATIC PLUGINS ### //
        ContextCreatorPlugin: ContextCreator,
        ContextPlugin: Context,
        Dashboard: Dashboard,
        DashboardsPlugin: Dashboards,
        FeedbackMaskPlugin: FeedbackMask,
        GeoStoryPlugin: GeoStory,
        GeoStoriesPlugin: GeoStories,
        MapsPlugin: Maps,
        PrintPlugin: Print,
        RulesDataGridPlugin: RulesDataGrid,
        RulesEditorPlugin: RulesEditor,
        RulesManagerFooter: RulesManagerFooter,

        // framework plugins
        AddGroupPlugin: toModulePlugin('AddGroup', () => import(/* webpackChunkName: 'plugins/about' */'@mapstore/plugins/AddGroup')),
        AnnotationsPlugin: toModulePlugin('Annotations', () => import(/* webpackChunkName: 'plugins/annotations' */ '@mapstore/plugins/Annotations')),
        AutoMapUpdatePlugin: toModulePlugin('AutoMapUpdate', () => import(/* webpackChunkName: 'plugins/autoMapUpdate' */ '@mapstore/plugins/AutoMapUpdate')),
        BackgroundSelectorPlugin: toModulePlugin('BackgroundSelector', () => import(/* webpackChunkName: 'plugins/backgroundSelector' */ '@mapstore/plugins/BackgroundSelector')),
        BurgerMenuPlugin: toModulePlugin('BurgerMenu', () => import(/* webpackChunkName: 'plugins/burgerMenu' */ '@mapstore/plugins/BurgerMenu')),
        CRSSelectorPlugin: toModulePlugin('CRSSelector', () => import(/* webpackChunkName: 'plugins/CRSSelector' */ '@mapstore/plugins/CRSSelector')),
        ContentTabs: toModulePlugin('ContentTabs', () => import(/* webpackChunkName: 'plugins/contentTabs' */ '@mapstore/plugins/ContentTabs')),
        ContextManagerPlugin: toModulePlugin('ContextManager', () => import(/* webpackChunkName: 'plugins/contextManager' */ '@mapstore/plugins/contextmanager/ContextManager')),
        ContextsPlugin: toModulePlugin('Contexts', () => import(/* webpackChunkName: 'plugins/contexts' */ '@mapstore/plugins/Contexts')),
        CookiePlugin: toModulePlugin('Cookie', () => import(/* webpackChunkName: 'plugins/cookie' */ '@mapstore/plugins/Cookie')),
        CreateNewMapPlugin: toModulePlugin('CreateNewMap', () => import(/* webpackChunkName: 'plugins/createNewMap' */ '@mapstore/plugins/CreateNewMap')),
        DashboardEditor: toModulePlugin('DashboardEditor', () => import(/* webpackChunkName: 'plugins/dashboardEditor' */ '@mapstore/plugins/DashboardEditor')),
        DashboardExport: toModulePlugin('DashboardExport', () => import(/* webpackChunkName: 'plugins/dashboardExport' */ '@mapstore/plugins/DashboardExport')),
        DashboardImport: toModulePlugin('DashboardImport', () => import( /* webpackChunkName: 'plugins/dashboardImport' */'@mapstore/plugins/DashboardImport')),
        DeleteMapPlugin: toModulePlugin('DeleteMap', () => import(/* webpackChunkName: 'plugins/deleteMap' */ '@mapstore/plugins/DeleteMap')),
        DeleteGeoStoryPlugin: toModulePlugin('DeleteGeoStory', () => import(/* webpackChunkName: 'plugins/deleteGeoStory' */ '@mapstore/plugins/DeleteGeoStory')),
        DeleteDashboardPlugin: toModulePlugin('DeleteDashboard', () => import(/* webpackChunkName: 'plugins/deleteDashboard' */ '@mapstore/plugins/DeleteDashboard')),
        DetailsPlugin: toModulePlugin('Details', () => import(/* webpackChunkName: 'plugins/details' */ '@mapstore/plugins/Details')),
        DrawerMenuPlugin: toModulePlugin('DrawerMenu', () => import(/* webpackChunkName: 'plugins/drawerMenu' */ '@mapstore/plugins/DrawerMenu')),
        ExpanderPlugin: toModulePlugin('Expander', () => import(/* webpackChunkName: 'plugins/expander' */ '@mapstore/plugins/Expander')),
        FeatureEditorPlugin: toModulePlugin('FeatureEditor', () => import(/* webpackChunkName: 'plugins/featureEditor' */ '@mapstore/plugins/FeatureEditor')),
        FeaturedMaps: toModulePlugin('FeaturedMaps', () => import(/* webpackChunkName: 'plugins/featuredMaps' */ '@mapstore/plugins/FeaturedMaps')),
        FilterLayerPlugin: toModulePlugin('FilterLayer', () => import(/* webpackChunkName: 'plugins/filterLayer' */ '@mapstore/plugins/FilterLayer')),
        FloatingLegendPlugin: toModulePlugin('FloatingLegend', () => import(/* webpackChunkName: 'plugins/floatingLegend' */ '@mapstore/plugins/FloatingLegend')),
        FullScreenPlugin: toModulePlugin('FullScreen', () => import(/* webpackChunkName: 'plugins/fullScreen' */ '@mapstore/plugins/FullScreen')),
        GeoStoryEditorPlugin: toModulePlugin('GeoStoryEditor', () => import(/* webpackChunkName: 'plugins/geoStoryEditor' */ '@mapstore/plugins/GeoStoryEditor')),
        GeoStorySavePlugin: toModulePlugin('GeoStorySave', () => import(/* webpackChunkName: 'plugins/geoStorySave' */ '@mapstore/plugins/GeoStorySave'), { exportedName: 'GeoStorySave'}),
        GeoStorySaveAsPlugin: toModulePlugin('GeoStorySaveAs', () => import(/* webpackChunkName: 'plugins/geoStorySave' */ '@mapstore/plugins/GeoStorySave'), { exportedName: 'GeoStorySaveAs'}),
        GeoStoryExport: toModulePlugin('GeoStoryExport', () => import(/* webpackChunkName: 'plugins/geoStoryExport' */ '@mapstore/plugins/GeoStoryExport')),
        GeoStoryImport: toModulePlugin('GeoStoryImport', () => import(/* webpackChunkName: 'plugins/geoStoryImport' */ '@mapstore/plugins/GeoStoryImport')),
        DashboardSavePlugin: toModulePlugin('DashboardSave', () => import(/* webpackChunkName: 'plugins/dashboardSave' */ '@mapstore/plugins/DashboardSave'), { exportedName: 'DashboardSave'}),
        DashboardSaveAsPlugin: toModulePlugin('DashboardSaveAs', () => import(/* webpackChunkName: 'plugins/dashboardSave' */ '@mapstore/plugins/DashboardSave'), { exportedName: 'DashboardSaveAs'}),
        GeoStoryNavigationPlugin: toModulePlugin('GeoStoryNavigation', () => import(/* webpackChunkName: 'plugins/geoStoryNavigation' */ '@mapstore/plugins/GeoStoryNavigation')),
        GroupManagerPlugin: toModulePlugin('GroupManager', () => import(/* webpackChunkName: 'plugins/groupManager' */ '@mapstore/plugins/manager/GroupManager')),
        GlobeViewSwitcherPlugin: toModulePlugin('GlobeViewSwitcher', () => import(/* webpackChunkName: 'plugins/globeViewSwitcher' */ '@mapstore/plugins/GlobeViewSwitcher')),
        GoFull: toModulePlugin('GoFull', () => import(/* webpackChunkName: 'plugins/goFull' */ '@mapstore/plugins/GoFull')),
        GridContainerPlugin: toModulePlugin('GridContainer', () => import(/* webpackChunkName: 'plugins/gridContainer' */ '@mapstore/plugins/GridContainer')),
        HelpLinkPlugin: toModulePlugin('HelpLink', () => import(/* webpackChunkName: 'plugins/helpLink' */ '@mapstore/plugins/HelpLink')),
        HelpPlugin: toModulePlugin('Help', () => import(/* webpackChunkName: 'plugins/helpPlugin' */ '@mapstore/plugins/Help')),
        HomePlugin: toModulePlugin('Home', () => import(/* webpackChunkName: 'plugins/home' */ '@mapstore/plugins/Home')),
        IdentifyPlugin: toModulePlugin('Identify', () => import(/* webpackChunkName: 'plugins/identify' */ '@mapstore/plugins/Identify')),
        LanguagePlugin: toModulePlugin('Language', () => import(/* webpackChunkName: 'plugins/language' */ '@mapstore/plugins/Language')),
        LayerDownload: toModulePlugin('LayerDownload', () => import(/* webpackChunkName: 'plugins/layerDownload' */ '@mapstore/plugins/LayerDownload')),
        LayerInfoPlugin: toModulePlugin('LayerInfo', () => import(/* webpackChunkName: 'plugins/layerInfo' */ '@mapstore/plugins/LayerInfo')),
        LocatePlugin: toModulePlugin('Locate', () => import(/* webpackChunkName: 'plugins/locate' */ '@mapstore/plugins/Locate')),
        LoginPlugin: toModulePlugin('Login', () => import(/* webpackChunkName: 'plugins/locate' */ '@mapstore/plugins/Login')),
        ManagerMenuPlugin: toModulePlugin('ManagerMenu', () => import(/* webpackChunkName: 'plugins/managerMenu' */ '@mapstore/plugins/manager/ManagerMenu')),
        ManagerPlugin: toModulePlugin('Manager', () => import(/* webpackChunkName: 'plugins/manager' */ '@mapstore/plugins/manager/Manager')),
        MapEditorPlugin: toModulePlugin('MapEditor', () => import(/* webpackChunkName: 'plugins/mapEditor' */ '@mapstore/plugins/MapEditor')),
        MapExportPlugin: toModulePlugin('MapExport', () => import(/* webpackChunkName: 'plugins/mapExport' */ '@mapstore/plugins/MapExport')),
        MapFooterPlugin: toModulePlugin('MapFooter', () => import(/* webpackChunkName: 'plugins/mapFooter' */ '@mapstore/plugins/MapFooter')),
        MapImportPlugin: toModulePlugin('MapImport', () => import(/* webpackChunkName: 'plugins/mapImport' */ '@mapstore/plugins/MapImport')),
        MapLoadingPlugin: toModulePlugin('MapLoading', () => import(/* webpackChunkName: 'plugins/mapLoading' */ '@mapstore/plugins/MapLoading')),
        MapPlugin: toModulePlugin('Map', () => import(/* webpackChunkName: 'plugins/map' */ '@mapstore/plugins/Map')),
        MapSearchPlugin: toModulePlugin('MapSearch', () => import(/* webpackChunkName: 'plugins/mapSearch' */ '@mapstore/plugins/MapSearch')),
        MapCatalogPlugin: toModulePlugin('MapCatalog', () => import(/* webpackChunkName: 'plugins/mapCatalog' */ '@mapstore/plugins/MapCatalog')),
        MapTemplatesPlugin: toModulePlugin('MapTemplates', () => import(/* webpackChunkName: 'plugins/measure' */ '@mapstore/plugins/MapTemplates')),
        MeasurePlugin: toModulePlugin('Measure', () => import(/* webpackChunkName: 'plugins/gridContainer' */ '@mapstore/plugins/Measure')),
        MediaEditorPlugin: toModulePlugin('MediaEditor', () => import(/* webpackChunkName: 'plugins/mediaEditor' */ '@mapstore/plugins/MediaEditor')),
        MetadataExplorerPlugin: toModulePlugin('MetadataExplorer', () => import(/* webpackChunkName: 'plugins/metadataExplorer' */ '@mapstore/plugins/MetadataExplorer')),
        MousePositionPlugin: toModulePlugin('MousePosition', () => import(/* webpackChunkName: 'plugins/mousePosition' */ '@mapstore/plugins/MousePosition')),
        NotificationsPlugin: toModulePlugin('Notifications', () => import(/* webpackChunkName: 'plugins/notifications' */ '@mapstore/plugins/Notifications')),
        OmniBarPlugin: toModulePlugin('OmniBar', () => import(/* webpackChunkName: 'plugins/omniBar' */ '@mapstore/plugins/OmniBar')),
        PlaybackPlugin: toModulePlugin('Playback', () => import(/* webpackChunkName: 'plugins/playback' */ '@mapstore/plugins/Playback')),
        QueryPanelPlugin: toModulePlugin('QueryPanel', () => import(/* webpackChunkName: 'plugins/queryPanel' */ '@mapstore/plugins/QueryPanel')),
        RedirectPlugin: toModulePlugin('Redirect', () => import(/* webpackChunkName: 'plugins/redirect' */ '@mapstore/plugins/Redirect')),
        RedoPlugin: toModulePlugin('Redo', () => import(/* webpackChunkName: 'plugins/history' */ '@mapstore/plugins/History')),
        SavePlugin: toModulePlugin('Save', () => import(/* webpackChunkName: 'plugins/save' */ '@mapstore/plugins/Save')),
        SaveAsPlugin: toModulePlugin('SaveAs', () => import(/* webpackChunkName: 'plugins/saveAs' */ '@mapstore/plugins/SaveAs')),
        SaveStoryPlugin: toModulePlugin('SaveStory', () => import(/* webpackChunkName: 'plugins/saveStory' */ '@mapstore/plugins/GeoStorySave')),
        ScaleBoxPlugin: toModulePlugin('ScaleBox', () => import(/* webpackChunkName: 'plugins/scaleBox' */ '@mapstore/plugins/ScaleBox')),
        ScrollTopPlugin: toModulePlugin('ScrollTop', () => import(/* webpackChunkName: 'plugins/scrollTop' */ '@mapstore/plugins/ScrollTop')),
        SearchPlugin: toModulePlugin('Search', () => import(/* webpackChunkName: 'plugins/search' */ '@mapstore/plugins/Search')),
        SearchServicesConfigPlugin: toModulePlugin('SearchServicesConfig', () => import(/* webpackChunkName: 'plugins/searchServicesConfig' */ '@mapstore/plugins/SearchServicesConfig')),
        SearchByBookmarkPlugin: toModulePlugin('SearchByBookmark', () => import(/* webpackChunkName: 'plugins/searchByBookmark' */ '@mapstore/plugins/SearchByBookmark')),
        SettingsPlugin: toModulePlugin('Settings', () => import(/* webpackChunkName: 'plugins/settings' */ '@mapstore/plugins/Settings')),
        SidebarMenuPlugin: toModulePlugin('SidebarMenu', () => import(/* webpackChunkName: 'plugins/sidebarMenu' */ '@mapstore/plugins/SidebarMenu')),
        SharePlugin: toModulePlugin('Share', () => import(/* webpackChunkName: 'plugins/share' */ '@mapstore/plugins/Share')),
        SnapshotPlugin: toModulePlugin('Snapshot', () => import(/* webpackChunkName: 'plugins/snapshot' */ '@mapstore/plugins/Snapshot')),
        StreetView: toModulePlugin('StreetView', () => import(/* webpackChunkName: 'plugins/streetView' */ '@mapstore/plugins/StreetView')),
        StyleEditor: toModulePlugin('StyleEditor', () => import(/* webpackChunkName: 'plugins/styleEditor' */ '@mapstore/plugins/StyleEditor')),
        SwipePlugin: toModulePlugin('Swipe', () => import(/* webpackChunkName: 'plugins/swipe' */ '@mapstore/plugins/Swipe')),
        TOCItemsSettingsPlugin: toModulePlugin('TOCItemsSettings', () => import(/* webpackChunkName: 'plugins/TOCItemsSettings' */ '@mapstore/plugins/TOCItemsSettings')),
        TOCPlugin: toModulePlugin('TOC', () => import(/* webpackChunkName: 'plugins/TOC' */ '@mapstore/plugins/TOC')),
        ThematicLayerPlugin: toModulePlugin('ThematicLayer', () => import(/* webpackChunkName: 'plugins/thematicLayer' */ '@mapstore/plugins/ThematicLayer')),
        ThemeSwitcherPlugin: toModulePlugin('ThemeSwitcher', () => import(/* webpackChunkName: 'plugins/themeSwitcher' */ '@mapstore/plugins/ThemeSwitcher')),
        TimelinePlugin: toModulePlugin('Timeline', () => import(/* webpackChunkName: 'plugins/timeline' */ '@mapstore/plugins/Timeline')),
        ToolbarPlugin: toModulePlugin('Toolbar', () => import(/* webpackChunkName: 'plugins/toolbar' */ '@mapstore/plugins/Toolbar')),
        TutorialPlugin: toModulePlugin('Tutorial', () => import(/* webpackChunkName: 'plugins/tutorial' */ '@mapstore/plugins/Tutorial')),
        UndoPlugin: toModulePlugin('Undo', () => import(/* webpackChunkName: 'plugins/history' */ '@mapstore/plugins/History')),
        UserExtensionsPlugin: toModulePlugin('UserExtensions', () => import(/* webpackChunkName: 'plugins/userExtensions' */ '@mapstore/plugins/UserExtensions')),
        UserManagerPlugin: toModulePlugin('UserManager', () => import(/* webpackChunkName: 'plugins/userManager' */ '@mapstore/plugins/manager/UserManager')),
        WidgetsBuilderPlugin: toModulePlugin('WidgetsBuilder', () => import(/* webpackChunkName: 'plugins/widgetsBuilder' */ '@mapstore/plugins/WidgetsBuilder')),
        WidgetsPlugin: toModulePlugin('Widgets', () => import(/* webpackChunkName: 'plugins/widgets' */ '@mapstore/plugins/Widgets')),
        WidgetsTrayPlugin: toModulePlugin('WidgetsTray', () => import(/* webpackChunkName: 'plugins/widgetsTray' */ '@mapstore/plugins/WidgetsTray')),
        ZoomAllPlugin: toModulePlugin('ZoomAll', () => import(/* webpackChunkName: 'plugins/zoomAll' */ '@mapstore/plugins/ZoomAll')),
        ZoomInPlugin: toModulePlugin('ZoomIn', () => import(/* webpackChunkName: 'plugins/zoomIn' */ '@mapstore/plugins/ZoomIn')),
        ZoomOutPlugin: toModulePlugin('ZoomOut', () => import(/* webpackChunkName: 'plugins/zoomOut' */ '@mapstore/plugins/ZoomOut')),
        // georchestra plugins2
        NotAllowedPlugin: require('./plugins/NotAllowed').default,
        HeaderPlugin: require('./plugins/Header').default,
        UserSessionPlugin: require('./plugins/UserSession').default,
        VersionPlugin: require('./plugins/Version').default
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('@mapstore/components/data/identify/SwipeHeader').default
    }
};
