const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addShortcode("tags", function(value) {
        let tags = value.split(",").map((tag) => '#' + tag.trim()).join(', ');
        return `<span class="tags">${tags}</span>`;
    });

    eleventyConfig.addShortcode("og_image_uri", async function(src) {
        let { url } = this.page;

        let metadata = await Image("." + url + src, {
            widths: [600],
            formats: ["jpeg"],
            urlPath: url,
            outputDir: `./_site/${url}`
        });

        return metadata.jpeg[0].url;
    });

    eleventyConfig.addShortcode("picture", async function(src, alt, sizes) {
        let { url } = this.page;

        let metadata = await Image("." + url + src, {
            widths: [300, 740],
            formats: ["avif", "jpeg"],
            urlPath: url,
            outputDir: `./_site/${url}`
        });

        let imageAttributes = {
            alt: alt || "",
            sizes: sizes || "(min-width: 30em) 50vw, 100vw",
            loading: "lazy",
            decoding: "async",
        };

        return Image.generateHTML(metadata, imageAttributes);
    });

    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy({
        "assets/css": "/assets/css",
        "assets/img": "/assets/img",
        "assets/favicons": "/",
    });
    eleventyConfig.addPassthroughCopy("blog/**/*.(jp(e|)g|png)");
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
    });
};
