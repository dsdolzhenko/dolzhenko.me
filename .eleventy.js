const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addShortcode("tags", function(value) {
        let tags = value.split(",").map((tag) => '#' + tag.trim()).join(', ');
        return `<span class="tags">${tags}</span>`;
    });

    eleventyConfig.addShortcode("og_image_uri", async function(page, src) {
        let { url } = page;

        let metadata = await Image("./src/" + url + src, {
            widths: [600],
            formats: ["jpeg"],
            urlPath: url,
            outputDir: `./dist/${url}`
        });

        return metadata.jpeg[0].url;
    });

    async function generateImageHTML(basePath, src, alt, sizes) {
        let metadata = await Image("./src/" + basePath + src, {
            widths: [300, 740],
            formats: ["avif", "jpeg"],
            urlPath: basePath,
            outputDir: `./dist/${basePath}`
        });

        let imageAttributes = {
            alt: alt || "",
            sizes: sizes || "(min-width: 30em) 50vw, 100vw",
            loading: "lazy",
            decoding: "async",
        };

        return Image.generateHTML(metadata, imageAttributes);
    }

    eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
        return generateImageHTML(this.page.url, src, alt, sizes);
    });

    eleventyConfig.addShortcode("picture", async function(src, alt, caption, sizes) {
        let imageHTML = await generateImageHTML(this.page.url, src, alt, sizes);

        return `
<figure class="picture">
  <a href="${src}">
    ${imageHTML}
  </a>
  ${ !caption ? '' : `<figcaption>${caption}</figcaption>` }
</figure>`;
    });

    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy({
        "src/assets/css": "/assets/css",
        "src/assets/img": "/assets/img",
        "src/assets/favicons": "/",
    });
    eleventyConfig.addPassthroughCopy("src/blog/**/*.(jp(e|)g|png)");
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
    });

    return {
        dir: {
            input: "src",
            includes: "includes",
            data: "data",
            output: "dist"
        }
    };
};
