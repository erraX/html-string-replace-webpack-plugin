var util = require('./util');

function HtmlStringReplace(options) {
    this.patterns = options.patterns || []
    this.enable = options.enable === undefined ? true : options.enable;
}

HtmlStringReplace.prototype.apply = function (compiler) {
    var that = this;

    util.getCompilation(compiler, function (htmlPluginData, callback) {
        if (that.enable) {
            htmlPluginData.html = that.replaceString(htmlPluginData.html, htmlPluginData.plugin.options);
        }

        callback(null, htmlPluginData);
    })
};

HtmlStringReplace.prototype.replaceString = function (html, htmlPluginOptions) {
    var patterns = this.patterns;

    patterns.forEach(function (pattern) {
        var match = pattern.match || new RegExp();
        var replacement = pattern.replacement || util.defaultReplace;

        html = html.replace(match, replacement);
    });

    return html;
};

module.exports = HtmlStringReplace;
