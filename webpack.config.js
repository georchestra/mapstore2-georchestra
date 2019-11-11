const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'GeOrchestra': path.join(__dirname, "js", "app"),
        'GeOrchestra-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'GeOrchestra-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    themeEntries,
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    extractThemesPlugin,
    false,
    "dist/",
    '.GeOrchestra',
    [],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    },
    {
        '/rest/geostore': {
            target: "https://georchestra.geo-solutions.it/mapstore", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        },
        '/pdf': {
            target: "https://georchestra.geo-solutions.it/mapstore", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        },
        '/mapstore/pdf': {
            target: "https://georchestra.geo-solutions.it", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        },
        '/proxy': { // proxy of GeOrchestra is already configured
            target: "https://georchestra.geo-solutions.it/proxy", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        },
        '/geonetwork': {
            target: "https://georchestra.geo-solutions.it/geonetwork", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        },
        '/header': {
            target: "https://georchestra.geo-solutions.it", // TODO: use local URL
            secure: false,
            headers: {
                host: "georchestra.geo-solutions.it"
            }
        }
    }
);
