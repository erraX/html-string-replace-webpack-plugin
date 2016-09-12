module.exports = {
    getCompilation: function(compiler, callback) {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-after-html-processing', callback);
        });
    },

    defaultReplace(match) {
        return match;
    }
};
