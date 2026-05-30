/**
 * Transform: JS
 * Inline all javascript (minified with @rollup/plugin-terser)
 */

import fs from 'node:fs';

export default async function (content) {
  if (
    process.env.ELEVENTY_ENV === 'production' &&
    this.page.outputPath &&
    this.page.outputPath.endsWith(".html")
  ) {
    const data = fs.readFileSync('dist/assets/min/main.min.js', 'utf8');

    return content.replace(
      '--INLINE JS--',
      `<script>${data}</script>`
    );
  }

  return content;
}
