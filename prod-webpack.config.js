const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
const gitRevisionPlugin = require('./revision');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

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
            template: path.join(__dirname, 'indexTemplate.html'),
            publicPath: 'dist/',
            chunks: ['geOrchestra'],
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            publicPath: 'dist/',
            chunks: ['embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['dashboard-embedded'],
            inject: "body",
            hash: true,
            filename: 'dashboard-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['geostory-embedded'],
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
