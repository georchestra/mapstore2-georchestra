const path = require("path");

const themeEntries = require('./themes.js').themeEntries;
const extractThemesPlugin = require('./themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moduleFederationPlugin = require('./MapStore2/build/moduleFederation.js').plugin;
const gitRevisionPlugin = require('./revision');

const { devServer } = require("./devServer");

const paths = {
    base: path.join(__dirname),
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};
module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        "ms2-api": path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geOrchestra': path.join(__dirname, "js", "app"),
        embedded: path.join(__dirname, "js", "embedded"),
        "dashboard-embedded": path.join( __dirname, "js", "dashboardEmbedded" ),
        "geostory-embedded": path.join( __dirname, "js", "geostoryEmbedded" )
    },
    themeEntries,
    paths,
    plugins: [extractThemesPlugin, moduleFederationPlugin, gitRevisionPlugin],
    prod: true,
    devServer,
    publicPath: undefined,
    cssPrefix: '.geOrchestra',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'indexTemplate.html'),
            publicPath: 'dist/',
            chunks: ['geOrchestra'],
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'embeddedTemplate.html'),
            publicPath: 'dist/',
            chunks: ['embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            // Keep the API's script id: the runtime uses it to resolve local theme assets.
            templateContent: require('fs').readFileSync(path.join(__dirname, 'api.html'), 'utf8'),
            publicPath: 'dist/',
            chunks: ['ms2-api'],
            inject: false,
            hash: true,
            filename: 'api.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'geostory-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['geostory-embedded'],
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'dashboard-embedded-template.html'),
            publicPath: 'dist/',
            chunks: ['dashboard-embedded'],
            inject: "body",
            hash: true,
            filename: 'dashboard-embedded.html'
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
