/**
 * Markdown filter to process markdown contents
 * @link https://11ty.rocks/eleventyjs/content/#markdown-filter
 */

import markdownIt from 'markdown-it';

const md = new markdownIt({
  html: true,
});

export default function (content) {
  return md.render(content);
}
