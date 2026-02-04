const path = require("path");

const themeEntries = require("./themes.js").themeEntries;
const extractThemesPlugin = require("./themes.js").extractThemesPlugin;
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
const gitRevisionPlugin = require('./revision');
const {devServer} = require('./devServer.js');
const paths = {
    base: path.join(__dirname, "."),
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require("./MapStore2/build/buildConfig")({
    bundles: {
        geOrchestra: path.join(__dirname, "js", "app"),
        embedded: path.join( __dirname, "js", "embedded" ),
        "dashboard-embedded": path.join( __dirname, "js", "dashboardEmbedded" ),
        "geostory-embedded": path.join( __dirname, "js", "geostoryEmbedded" )
    },
    themeEntries,
    paths,
    plugins: [extractThemesPlugin, moduleFederationPlugin, gitRevisionPlugin],
    prod: false,
    publicPath: "dist/",
    cssPrefix: ".geOrchestra",
    prodPlugins: [],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    },
    proxy: devServer.proxy
});
