const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'geOrchestra': path.join(__dirname, "js", "app"),
        embedded: path.join(__dirname, "js", "embedded")
    },
    themeEntries,
    paths,
    [extractThemesPlugin, moduleFederationPlugin],
    true,
    undefined,
    '.geOrchestra',
    [
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
        })
    ],
    {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
