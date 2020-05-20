const extractThemesPlugin = require('../../themes').extractThemesPlugin;

const path = require("path");
const assign = require('object-assign');
const buildConfig = require('../../MapStore2/build/buildConfig');

const paths = {
    base: path.join(__dirname, "..", ".."),
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "..", "..", "MapStore2", "web", "client"),
    code: [path.join(__dirname), path.join(__dirname, "plugins"), path.join(__dirname, "..", "..", "MapStore2", "web", "client"), path.join(__dirname, "..", "..", "js")]
};

const baseConfig = buildConfig(
    {
        extensions: path.join(__dirname, "app")
    },
    {},
    paths,
    extractThemesPlugin,
    true,
    "/dist/",
    false,
    [],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js"),
        // next libs are added because of this issue https://github.com/geosolutions-it/MapStore2/issues/4569
        jsonix: "@boundlessgeo/jsonix",
        proj4: "@geosolutions/proj4",
        "react-joyride": "@geosolutions/react-joyride"
    }
);
module.exports = assign(baseConfig, {
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[name].js"
    }
});
