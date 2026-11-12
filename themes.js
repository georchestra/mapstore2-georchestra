const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require("path");
const { readdirSync } = require('fs');
const extractThemesPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});


const themeEntries = (() => {
    return readdirSync(path.join(__dirname, 'themes'), { withFileTypes: true })
        .filter(entry => entry.isDirectory()).reduce((entries, entry) => ({
            ...entries,
            [`themes/${entry.name}`]: path.join(__dirname, 'themes', entry.name, 'theme.less')
        }), {});

})();
module.exports = {
    themeEntries,
    extractThemesPlugin
};
