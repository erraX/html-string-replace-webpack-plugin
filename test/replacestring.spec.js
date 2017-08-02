var HtmlStringReplace = require('../lib/HtmlStringReplace');

describe('test string replacement', function () {
    it('should replace string', function () {
        var plugin = new HtmlStringReplace({
            enable: true,
            patterns: [
                {
                    // eg.
                    // <link href="build.css">  =>
                    // <link href="//cdn.baidu.com/static/build.css"> 
                    match: /href=\"([^\"]*)\"/g,
                    replacement: function (match, $1) {
                        return 'href="//cdn.baidu.com/static/' + $1 + '"';
                    }
                },
                {
                    // eg.
                    // <script src="build.js">  =>
                    // <script src="//cdn.baidu.com/static/build.js"> 
                    match: /src=\"([^\"]*)\"/g,
                    replacement: 'src="//cdn.baidu.com/static/$1"'
                }
            ]
        });

        expect(plugin.replaceString('<link href="build.css">')).toBe('<link href="//cdn.baidu.com/static/build.css">');
        expect(plugin.replaceString('<script src="build.js">')).toBe('<script src="//cdn.baidu.com/static/build.js">');
    });
});
