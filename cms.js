const path = require('path');
const cms = require('cms');
const consolidate = require('consolidate');
const markdown = require('markdown-it')().use(require('markdown-it-footnote')).use(require('markdown-it-highlightjs')).use(require('markdown-it-sub'));
const moment = require('moment');
const striptags = require('striptags');

const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');

module.exports = cms({
  permalink: permalink => `${permalink}/`,
  template: consolidate.pug,
  paths: {
    content,
    templates,
    output,
  },
  extensions: {
    templates: [
      'pug',
    ],
    images: [
      'jpg',
      'jpeg',
      'gif',
      'png',
      'svg',
    ],
  },
  addons: {
    markdown: input => markdown.render(input),
    formatDate: (timestamp, pattern) => moment(timestamp, 'X').format(pattern),
    stripTags: input => striptags(input),
  },
  globals: {
    site: 'Frontend Development',
  },
  shortcodes: {
    image: (attrs, page) => {
      const image = page.images.find(item => item.url.endsWith(`/${attrs.image}`));
      if (image) {
        const width = attrs.width || image.width;
        const height = attrs.height || image.height;
        const modifiers = [];
        if (attrs.bordered) {
          modifiers.push('bordered');
        }
        return `
          <span class="image${modifiers.length ? ` ${modifiers.map(modifier => `image--${modifier}`).join(' ')}` : ''}">
            <img data-src="${image.url}" alt="${attrs.title || image.title || image.alt || ''}"${width ? ` width="${width || ''}"` : ''}${height ? ` height="${height || ''}"` : ''}${attrs.title ? ` title="${attrs.title || ''}"` : ''}>
          </span>
        `;
      }
      throw new Error(`Missing image: ${attrs.image}`);
    },
    reference: (attrs, page) => {
      const reference = page.genesis.children.find(child => child.visible && child.index && child.index === parseInt(attrs.reference, 10));
      if (reference) {
        return `<a href="${reference.url}">${attrs.text}</a>`;
      }
      throw new Error(`Missing reference: ${attrs.reference}`);
    },
    math: attrs => `<span class="math">${attrs.math.replace(/\|LEFT_PARENTHESIS\|/g, '(').replace(/\|RIGHT_PARENTHESIS\|/g, ')')}</span>`,
  },
});
