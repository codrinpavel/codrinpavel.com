/**
 * Transform: CSS
 * 
 * 1. PurgeCSS @link https://github.com/FullHuman/purgecss
 * 2. Append BASEPATH to all /assets/ references
 * 3. Inline results in the <head> section of the document
 */

import { PurgeCSS } from 'purgecss';
import Config from '../config.js';

export default async function (content) {
  if (
    process.env.ELEVENTY_ENV == 'production' &&
    this.page.outputPath &&
    this.page.outputPath.endsWith(".html")
  ) {
    // 1.
    const purgeCSSResults = await new PurgeCSS().purge({
      content: [{ raw: content }],
      css: ['dist/assets/min/main.min.css'],
      defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      keyframes: false,
      safelist: {
        greedy: [
          /^js/,
          /^is/,
          /^has/,
          /sr-only/,
          /class/,
          /target/,
          /path/,
          /circle/,
          /stroke/,
          /fill/,
          /rowspan/,
          /colspan/,
          /aria/,
          /:where/
        ]
      }
    });

    // 2.
    const results = purgeCSSResults[0].css.replaceAll(
      '/assets/',
      `${Config.BASEPATH}/assets/`
    );

    // 3.
    return content.replace(
      '<!--INLINE CSS-->',
      `<style>${results}</style>`
    );
  }

  return content;
}
