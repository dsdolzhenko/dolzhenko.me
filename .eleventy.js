const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy({
        "assets/css": "/assets/css",
        "assets/img": "/assets/img",
        "assets/favicons": "/",
    });
};
