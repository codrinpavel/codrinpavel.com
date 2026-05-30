/**
 * Shortcode: {% img %}
 * @link https://www.11ty.dev/docs/plugins/image/
 * 
 * @param {string} src              - image path and filename
 * @param {string} [alt=""]         - alt text
 * @param {string} [css_classes=]   - CSS classes
 * @param {string} [loading="lazy"] - disables lazy-loading
 * 
 * Usage: {% img "folder/filename.jpg", "alt text", "css_classes", lazy|eager %}
 * Assumes base img directory is ./src/assets/img/
 */

import Image from '@11ty/eleventy-img';
import Config from '../config.js';

export default async function (
  src,
  alt = "",
  css_classes = "",
  loading = "lazy"
) {
  const classes = `image ${css_classes}`.trim();

  const metadata = await Image(`./src/assets/img/${src}`, {
    widths: [null, 1024, 2048],
    formats: ["webp", null],
    urlPath: `${Config.BASEPATH}/assets/img`,
    outputDir: "dist/assets/img"
  });

  const imageAttributes = {
    class: classes,
    alt,
    loading,
    decoding: "async",
    sizes: "100vw",
  };

  return Image.generateHTML(metadata, imageAttributes);
}