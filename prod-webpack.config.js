const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
const gitRevisionPlugin = require('./revision');

const paths = {
    base: path.join(__dirname),
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};
const favicon = path.resolve("./favicon.ico");
module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        'geOrchestra': path.join(__dirname, "js", "app"),
        embedded: path.join(__dirname, "js", "embedded"),
        "dashboard-embedded": path.join( __dirname, "js", "dashboardEmbedded" ),
        "geostory-embedded": path.join( __dirname, "js", "geostoryEmbedded" )
    },
    themeEntries,
    paths,
    plugins: [extractThemesPlugin, moduleFederationPlugin, gitRevisionPlugin],
    prod: true,
    publicPath: undefined,
    cssPrefix: '.geOrchestra',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'indexTemplate.html'),
            publicPath: 'dist/',
            chunks: ['geOrchestra'],
            inject: "body",
            hash: true,
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'embeddedTemplate.html'),
            publicPath: 'dist/',
            chunks: ['embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'dashboard-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['ms2-api'],
            inject: "body",
            hash: true,
            filename: 'api.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'geostory-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['geostory-embedded'],
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html',
            favicon
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'dashboard-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['dashboard-embedded'],
            inject: "body",
            hash: true,
            filename: 'dashboard-embedded.html',
            favicon
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
