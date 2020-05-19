const extractThemesPlugin = require('../../MapStore2/build/themes').extractThemesPlugin;

const path = require("path");
const assign = require('object-assign');
const buildConfig = require('../../MapStore2/build/buildConfig');

const paths = {
    base: path.join(__dirname, "..", ".."),
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "..", "..", "MapStore2", "web", "client"),
    code: path.join(__dirname)
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
    ".GeOrchestra",
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
console.log(JSON.stringify(baseConfig, 2, 2));
module.exports = assign(baseConfig, {
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[name].js"
    }
});
