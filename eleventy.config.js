import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import embedYouTube from "eleventy-plugin-youtube-embed";
import markdownItTaskCheckbox from "markdown-it-task-checkbox";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
	});
	// Media that might be linked from posts
	eleventyConfig.addPassthroughCopy("./content/**/*.mp4");
	eleventyConfig.addPassthroughCopy("./content/**/*.blend");
	eleventyConfig.addPassthroughCopy("./content/**/*.pdf");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	// Adds the {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		stylesheet: "./css/pretty-atom-feed.xsl",
		templateData: {
			// eleventyNavigation: {
			// 	key: "Feed",
			// 	order: 4,
			// },
		},
		collection: {
			name: "my-posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Forrest O. Interactive",
			subtitle: "Forrest O.'s web blog wiki garden home",
			base: "https://forresto.com/",
			author: {
				name: "Forrest O.",
			},
		},
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp", "auto"],
		svgShortCircuit: "size",

		widths: [1280],
		filenameFormat: function (id, src, width, format, options) {
			// Should be in equivalent directory as original image
			const fileName = src.split("/").pop();
			return `${fileName}-${id}-${width}.${format}`;
		},

		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",
			},
		},

		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return new Date().toISOString();
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	/**


	👁️


	*/

	eleventyConfig.addPlugin(embedYouTube);

	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItTaskCheckbox));

	// Set global permalinks to resource.html style
	eleventyConfig.addGlobalData("permalink", () => {
		return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});

	eleventyConfig.addCollection("my-posts", function (collectionsApi) {
		const isPost = (item) => {
			const dir = item.filePathStem.split("/");
			const extension = item.inputPath.split(".").pop();
			return !item.data.isIndex && dir.length >= 3 && extension === "md";
		};
		return collectionsApi.getAllSorted().filter(isPost);
	});

	eleventyConfig.addCollection("directories", function (collectionsApi) {
		const directories = {};

		// Get all content, including index files
		const allContent = collectionsApi.getAllSorted();

		for (const item of allContent) {
			const pathParts = item.filePathStem.split("/");

			// Only process items that are at least two levels deep (directory/file)
			if (pathParts.length >= 3) {
				const dir = pathParts[1];

				if (!directories[dir]) {
					directories[dir] = {
						name: dir,
						path: `/${dir}/`,
						posts: [],
					};
				}

				if (!item.data.isIndex) {
					directories[dir].posts.push(item);
				}
			}
		}

		// Add a lookup function to the collection
		const directoriesArray = Object.values(directories);
		directoriesArray.getByName = function (name) {
			return this.find((dir) => dir.name === name);
		};

		return directoriesArray.reverse();
	});
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content", // default: "."
		includes: "../_includes", // default: "_includes" (`input` relative)
		data: "../_data", // default: "_data" (`input` relative)
		output: "_site",
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
