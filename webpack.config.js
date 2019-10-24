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
            target: "http://localhost:8080/mapstore",
            secure: false,
            headers: {
                host: "localhost:8080"
            }
        },
        '/pdf': {
            target: "http://localhost:8080/mapstore",
            secure: false,
            headers: {
                host: "localhost:8080"
            }
        },
        '/mapstore/pdf': {
            target: "http://localhost:8080",
            secure: false,
            headers: {
                host: "localhost:8080"
            }
        },
        '/proxy': {
            target: "http://localhost:8080/mapstore",
            secure: false,
            headers: {
                host: "localhost:8080"
            }
        },
        '/docs': {
            target: "http://localhost:8081",
            pathRewrite: { '/docs': '/mapstore/docs' }
        }
    }
);
