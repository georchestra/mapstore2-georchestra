const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const DefinePlugin = require("webpack/lib/DefinePlugin");

const parseCommand = () => {
    const commands = [
        'rev-parse HEAD', // Repository commit hash
        // 'rev-parse --abbrev-ref HEAD', // Repository branch name
        // 'remote get-url origin', // Repository url
        'submodule status' // Submodule info
        // 'submodule foreach -q git config remote.origin.url' // Submodule url
    ];
    return commands.map(command => JSON.stringify(
        new GitRevisionPlugin({
            branchCommand: command
        }).branch()
    ));
};
module.exports = new DefinePlugin({
    '__VERSIONINFO__': parseCommand()
});
