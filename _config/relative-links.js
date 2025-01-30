/** Forked from HtmlBasePlugin.js
 *
 *	This plugin tries to make all URLs in the HTML output relative to the page.
 *
 *  Useful for:
 *  * browsing via file://
 *  * gh-pages in subdirectory repo
 *  * unsure where in the directory structure the site will be hosted
 *
 *  Might require HtmlBasePlugin to run first, because we're expecting the
 *  internal links to start with "/"
 *
 *  todo?
 *  * option to include "index.html" for those links, for extra file:// compat
 *
 */

import path from "path";

export default function (eleventyConfig) {
	// Apply to all HTML output in your project
	eleventyConfig.htmlTransformer.addUrlTransform(
		"html",
		function makeUrlRelative(urlInMarkup) {
			// Skip empty, non-root-relative, protocol-relative, and dev server
			if (
				!urlInMarkup ||
				!urlInMarkup.startsWith("/") ||
				urlInMarkup.startsWith("//") ||
				urlInMarkup.startsWith("/.11ty/")
			) {
				return urlInMarkup;
			}

			// Get base directory path (keep trailing slash for index pages)
			const fromDir = this.url.endsWith("/") ? this.url : path.dirname(this.url);

			let relativePath = path.relative(fromDir, urlInMarkup);

			// Add ./ for same-directory references
			if (!relativePath.startsWith(".")) {
				relativePath = "./" + relativePath;
			}

			// Preserve trailing slash from original URL
			if (urlInMarkup.endsWith("/") && !relativePath.endsWith("/")) {
				relativePath += "/";
			}

			// console.log(this.url, fromDir, urlInMarkup, relativePath);
			return relativePath;
		},
		{
			priority: -1, // run last, after PathToUrl
		},
	);
}
