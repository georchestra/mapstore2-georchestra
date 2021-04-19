import {
    setConfigProp,
    setLocalConfigurationFile
} from '@mapstore/utils/ConfigUtils';

// Add custom (overriding) translations
// example for additional translations in the project folder
// setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
setConfigProp("translationsPath", [
    "./MapStore2/web/client/translations",
    "./translations"
]);
setConfigProp("geoStoreUrl", "rest/geostore/");
setConfigProp("configurationFolder", "rest/config/load/");


// __PROJECTNAME__ is the name of the project used in the creation process
setConfigProp('themePrefix', 'geOrchestra');

// Use a custom plugins configuration file
// example if localConfig.json is located in the root of the project
// setLocalConfigurationFile('localConfig.json');
setLocalConfigurationFile("rest/config/load/localConfig.json");

// async load of the standard embedded bundle
import('@mapstore/product/embedded');
