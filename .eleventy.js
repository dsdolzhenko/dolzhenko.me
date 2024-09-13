const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

const _ = require("lodash");
const { DateTime } = require("luxon");

function dateFilter(date, format) {
    if (date instanceof Date) {
        return DateTime.fromJSDate(date, {
            zone: "utc",
            locale: "en"
        }).toFormat(format);
    } else {
        return DateTime.fromISO(date, {
            zone: "utc",
            locale: "en"
        }).toFormat(format);
    }
}

function groupByYearFilter(posts) {
    return _.chain(posts)
        .groupBy((post) => post.date.getFullYear())
        .toPairs()
        .reverse()
        .value();
}

function whereFilter(posts, attr, value) {
    return _.filter(posts, (post) => post[attr] === value);
}

function takeFilter(posts, n) {
    return _.take(posts, n)
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addFilter("date", dateFilter);
    eleventyConfig.addFilter("groupByYear", groupByYearFilter);
    eleventyConfig.addFilter("where", whereFilter);
    eleventyConfig.addFilter("take", takeFilter);

    eleventyConfig.addShortcode("tags", function(value) {
        let tags = value.split(",").map((tag) => "#" + tag.trim()).join(", ");
        return `<span class="tags">${tags}</span>`;
    });

    eleventyConfig.addShortcode("og_image_uri", async function(page, src) {
        let { url } = page;

        let metadata = await Image("./src" + url + src, {
            widths: [600],
            formats: ["jpeg"],
            urlPath: url,
            outputDir: `./dist/${url}`
        });

        return metadata.jpeg[0].url;
    });

    async function generateImageHTML(basePath, src, alt, sizes) {
        let metadata = await Image("./src" + basePath + src, {
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
  ${ !caption ? "" : `<figcaption>${caption}</figcaption>` }
</figure>`;
    });

    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy({
        "src/assets/css": "/assets/css",
        "src/assets/img": "/assets/img",
        "src/assets/favicons": "/",
    });
    eleventyConfig.addPassthroughCopy("src/**/*.(jp(e|)g|png)");
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
    });

    // Exclude drafts from collections
    eleventyConfig.addGlobalData(
        "eleventyComputed.eleventyExcludeFromCollections",
        function () {
            return (data) => {
                // Always exclude from non-watch/serve builds
                if (data.draft) {
                    return true;
                }

                return data.eleventyExcludeFromCollections;
            };
        }
    );

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            includes: "includes",
            data: "data",
            output: "dist",
        },
    };
};
