/**
 * Shortcode: {% img %}
 * @link https://www.11ty.dev/docs/plugins/image/
 *
 * @param {string} src                - Image path and filename, relative to ./src/assets/img/
 * @param {string} [alt=""]           - Alt text (ignored when preload=true)
 * @param {string} [css_classes=""]   - CSS classes applied to the image (ignored when preload=true)
 * @param {string} [loading="lazy"]   - Image loading strategy: "lazy" or "eager" (ignored when preload=true)
 * @param {boolean} [preload=false]   - Output a <link rel="preload"> tag instead of the image markup
 *
 * Usage:
 *   {% img "folder/filename.jpg" %}
 *   {% img "folder/filename.jpg", "alt text", "css_classes", "eager" %}
 *   {% img "folder/filename.jpg", "", "", "lazy", true %}
 *
 * Examples:
 *   <!-- In <head> -->
 *   {% img "hero.jpg", "", "", "lazy", true %}
 *
 *   <!-- In <body> -->
 *   {% img "hero.jpg", "Hero image", "hero", "eager" %}
 *
 * Notes:
 *   - Generates responsive images using @11ty/eleventy-img.
 *   - Preloads use the generated WebP srcset via imagesrcset/imagesizes.
 *   - Assumes the base image directory is ./src/assets/img/
 */

import Image from "@11ty/eleventy-img";
import Config from "../config.js";

export default async function (
  src,
  alt = "",
  css_classes = "",
  loading = "lazy",
  preload = false
) {
  const metadata = await Image(`./src/assets/img/${src}`, {
    widths: [null, 1024, 2048],
    formats: ["webp", null],
    urlPath: `${Config.BASEPATH}/assets/img`,
    outputDir: "dist/assets/img",
  });

  const sizes = "100vw";

  if (preload) {
    const webp = metadata.webp;

    const srcset = webp
      .map((img) => `${img.url} ${img.width}w`)
      .join(", ");

    return `<link rel="preload" as="image" fetchpriority="high" type="image/webp" imagesizes="${sizes}"
      href="${webp[0].url}"
      imagesrcset="${srcset}"
    >`;
  }

  return Image.generateHTML(metadata, {
    class: `image ${css_classes}`.trim(),
    alt,
    loading,
    fetchpriority: loading === "eager" ? "high" : undefined,
    decoding: "async",
    sizes,
  });
}