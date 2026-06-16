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
      css: [
        'dist/assets/min/01.theme/01.theme.min.css',
        'dist/assets/min/02.base/02.base.min.css',
        'dist/assets/min/03.components/03.components.min.css',
        'dist/assets/min/04.utilities/04.utilities.min.css',
        'dist/assets/min/05.app/05.app.min.css',
      ],
      defaultExtractor: content => content.match(/\b[A-Za-z0-9-_:/]+\b/g) || [],
      dynamicAttributes: ['hidden'],
      rejected: true,
      safelist: {
        greedy: [
          /^js/,
          /^is/,
          /^has/,
          /^vt-/,
          /sr-only/,
          /animation/,
          /wave-word/,
          /overflow-hidden/
        ]
      }
    });

    // 2.
    let results = '';
    purgeCSSResults.forEach((result, i) => {
      //console.log(result.rejected);
      results += result.css.replaceAll('/assets/', Config.BASEPATH + '/assets/');
    });

    // 3.
    return content.replace('<!--INLINE CSS-->', '<style>' + results + '</style>');
  }

  return content;
}
