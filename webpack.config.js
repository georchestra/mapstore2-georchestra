const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;

const DEV_PROTOCOL = "https";
const DEV_HOST = "georchestra.geo-solutions.it";

module.exports = require("./MapStore2/build/buildConfig")(
    {
        GeOrchestra: path.join(__dirname, "js", "app"),
        "GeOrchestra-embedded": path.join(
            __dirname,
            "MapStore2",
            "web",
            "client",
            "product",
            "embedded"
        ),
        "GeOrchestra-api": path.join(
            __dirname,
            "MapStore2",
            "web",
            "client",
            "product",
            "api"
        )
    },
    themeEntries,
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [
            path.join(__dirname, "js"),
            path.join(__dirname, "MapStore2", "web", "client")
        ]
    },
    extractThemesPlugin,
    false,
    "dist/",
    ".GeOrchestra",
    [],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js"),
        // next libs are added because of this issue https://github.com/geosolutions-it/MapStore2/issues/4569
        jsonix: '@boundlessgeo/jsonix',
        proj4: '@geosolutions/proj4',
        "react-joyride": '@geosolutions/react-joyride'
    },
    {
        "/rest/geostore": {
            target: `${DEV_PROTOCOL}://${DEV_HOST}/mapstore`,
            secure: false,
            headers: {
                host: `${DEV_HOST}`
            }
        },
        "/config": {
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
            // proxy of GeOrchestra is already configured
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
    }
);
