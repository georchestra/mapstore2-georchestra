const path = require("path");

const themeEntries = require("./themes.js").themeEntries;
const extractThemesPlugin = require("./themes.js").extractThemesPlugin;
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
const gitRevisionPlugin = require('./revision');

const DEV_PROTOCOL = "http";
const DEV_HOST = "localhost:8080";

module.exports = require("./MapStore2/build/buildConfig")({
    bundles: {
        geOrchestra: path.join(__dirname, "js", "app"),
        embedded: path.join( __dirname, "js", "embedded" ),
        "dashboard-embedded": path.join( __dirname, "js", "dashboardEmbedded" ),
        "geostory-embedded": path.join( __dirname, "js", "geostoryEmbedded" )
    },
    themeEntries,
    paths: {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [
            path.join(__dirname, "js"),
            path.join(__dirname, "MapStore2", "web", "client")
        ]
    },
    plugins: [extractThemesPlugin, moduleFederationPlugin, gitRevisionPlugin],
    prod: false,
    publicPath: "dist/",
    cssPrefix: ".geOrchestra",
    prodPlugins: [],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js"),
        // next libs are added because of this issue https://github.com/geosolutions-it/MapStore2/issues/4569
        jsonix: "@boundlessgeo/jsonix",
        proj4: "@geosolutions/proj4",
        "react-joyride": "@geosolutions/react-joyride"
    },
    proxy: {
        "/rest": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}/mapstore`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/pdf": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}/mapstore`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/mapstore/pdf": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/proxy": {
            // proxy of geOrchestra is already configured
            target: `${DEV_PROTOCOL}://${DEV_HOST}/mapstore`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/geonetwork": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}/geonetwork`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/header": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        }
    }}
);
