var util = require('./util');

function HtmlStringReplace(options) {
    this.replacements = options.replacements || []
    this.enable = options.enable === undefined ? true : options.enable;
}

HtmlStringReplace.prototype.apply = function (compiler) {
    var that = this;

    util.getCompilation(compiler, function (htmlPluginData, callback) {
        if (this.enable) {
            htmlPluginData.html = that.replaceString(htmlPluginData.html, htmlPluginData.plugin.options);
        }

        callback(null, htmlPluginData);
    })
};

HtmlStringReplace.prototype.replaceString = function (html, htmlPluginOptions) {
    var replacements = this.replacements;

    replacements.forEach(function (replacement) {
        var pattern = replacement.pattern || new RegExp();
        var replace = replacement.replace || util.defaultReplace;

        html = html.replace(pattern, replace);
    });

    return html;
};

module.exports = HtmlStringReplace;
