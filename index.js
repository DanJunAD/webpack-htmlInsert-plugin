const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
function WebpackInsertPlugin (opt) {
    this.insertContent = opt.content || '';
    this.fileList = opt.fileList || [];
}
WebpackInsertPlugin.prototype.insertHtmlContent = function (content) {
    const self = this;
    const $ = cheerio.load(content, {
        decodeEntities: false
    });
    const headRegExp = /(<\/head\s*>)/i;
    if (headRegExp.test(content)) {
        $('head').append(self.insertContent);
    }

    return $.html();
};
WebpackInsertPlugin.prototype.apply = function (compiler, callback) {
    const self = this;
    compiler.plugin('compilation', function (compilation) {
        const fList = [];
        if (self.fileList && self.fileList.length) {
            self.fileList.forEach(function (file) {
                fList.push(path.resolve(process.cwd(), file))
            });
        }
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
            if (fList.length) {
                fList.forEach(function (file) {
                    const f = new RegExp(file);
                    if (f.test(htmlPluginData.plugin.options.template)) {
                        htmlPluginData.html = self.insertHtmlContent(htmlPluginData.html);
                    }
                });
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = WebpackInsertPlugin;
