const path = require('path');
const os = require('os');
const cms = require('cms');
const consolidate = require('consolidate');
const markdown = require('markdown-it')()
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'));
const moment = require('moment');
const striptags = require('striptags');

const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');
const fonts = require('./src/fonts');

const instance = cms({
  template: consolidate.pug,
  paths: {
    content,
    templates,
    output,
  },
  separators: {
    line: `${os.EOL}-----${os.EOL}`,
    values: ':',
  },
  extensions: {
    templates: ['pug'],
    images: ['jpg', 'jpeg', 'gif', 'png', 'svg'],
  },
  addons: {
    markdown: input => markdown.render(input),
    markdownInline: input => markdown.renderInline(input),
    formatDate: (timestamp, pattern) => moment(timestamp, 'X').format(pattern),
    stripTags: input => striptags(input),
    getAllPosts: genesis => {
      return genesis.children
        .filter(page => page.template === 'category')
        .reduce(
          (acc, category) => [
            ...acc,
            ...category.children.filter(page => page.visible),
          ],
          [],
        )
        .sort((a, b) => b.date - a.date);
    },
    getPostsForAuthor: (posts, author) => {
      return posts.filter(post =>
        post.authors.split(/\s*,\s*/).includes(path.basename(author)),
      );
    },
    generateHashtags: page =>
      [...(page.tags || []), ...path.dirname(page.url).split(/\//g)]
        .map(part => part.trim())
        .filter(Boolean)
        .map(part => `#${part.replace(/[\W]/g, '')}`)
        .reverse()
        .join(' '),
    getSchemaForTemplate: template => {
      switch (template) {
        case 'home':
        case 'category':
        case 'author':
          return 'Blog';
        case 'post':
        case 'question':
          return 'BlogPosting';
        default:
          return 'WebPage';
      }
    },
    getOpenGraphTypeForTemplate: template => {
      switch (template) {
        case 'home':
        case 'category':
        case 'author':
          return 'blog';
        case 'post':
        case 'question':
          return 'article';
        default:
          return 'website';
      }
    },
    trimDescription: (input, max = 150) => {
      const description = input.replace(/\s+/g, ' ');
      return (description.length > max
        ? `${description.substr(0, max).trim()}…`
        : description
      ).trim();
    },
  },
  globals: {
    fonts,
  },
  shortcodes: {
    email: attrs => {
      const address = attrs.email.replace(/@/g, ' AT ').replace(/\./g, ' DOT ');
      const text = attrs.text || address;
      return `<span class="obfuscated"${
        text !== address ? `data-address="${address}"` : ''
      }${attrs.text ? `data-text="${text}"` : ''}>${
        attrs.text ? `${text} (${address})` : address
      }</span>`;
    },
    image: (attrs, page) => {
      const image = page.images.find(item =>
        item.url.endsWith(`/${attrs.image}`),
      );
      if (!image) {
        throw new Error(`Missing image: ${attrs.image}`);
      }
      const width = attrs.width || image.width;
      const height = attrs.height || image.height;
      const modifiers = [];
      if (attrs.bordered) {
        modifiers.push('bordered');
      }

      return `
        <span class="image${
          modifiers.length
            ? ` ${modifiers.map(modifier => `image--${modifier}`).join(' ')}`
            : ''
        }">
          <img data-src="${image.url}" alt="${attrs.title ||
        image.title ||
        image.alt ||
        ''}"${width ? ` width="${width}"` : ''}${
        height ? ` height="${height}"` : ''
      }${attrs.title ? ` title="${attrs.title}"` : ''}>
        </span>
      `;
    },
    gallery: (attrs, page) => {
      const items = attrs.gallery.split(/\s+/);
      return `
        <span class="gallery">
          ${items
            .map(itemName => {
              const image = page.images.find(item =>
                item.url.endsWith(`/${itemName}`),
              );
              if (!image) {
                throw new Error(`Missing image: ${itemName}`);
              }
              return `
              <span class="gallery__item">
                <img data-src="${image.url}" alt="${image.title ||
                image.alt ||
                ''}"${image.width ? ` width="${image.width}"` : ''}${
                image.height ? ` height="${image.height}"` : ''
              }">
              </span>
            `;
            })
            .join(' ')}
        </span>
      `;
    },
    reference: (attrs, page) => {
      const reference = page.genesis.findPageByUrl(`/${attrs.reference}`);
      if (!reference) {
        throw new Error(`Missing reference: ${attrs.reference}`);
      }
      return `<a href="${reference.url}">${attrs.text}</a>`;
    },
    math: attrs =>
      `<span class="math">${attrs.math
        .replace(/\|LEFT_PARENTHESIS\|/g, '(')
        .replace(/\|RIGHT_PARENTHESIS\|/g, ')')}</span>`,
  },
});

const genesis = instance.get();
const authors = genesis.findPageByUrl('/authors');
const posts = genesis.children
  .filter(page => page.template === 'category')
  .reduce(
    (acc, category) => [
      ...acc,
      ...category.children.filter(page => page.visible),
    ],
    [],
  )
  .sort((a, b) => b.date - a.date);

const ifttt = genesis.addVirtualPage({
  identifier: 'ifttt',
  template: 'ifttt',
  posts: posts.slice(0, 20),
});

authors.children.forEach(author => {
  const authorId = path.basename(author.url);
  ifttt.addVirtualPage({
    identifier: `ifttt/${authorId}`,
    template: 'ifttt',
    posts: posts
      .filter(post => post.authors.split(/\s*,\s*/).includes(authorId))
      .slice(0, 20),
  });
});

const feed = genesis.addVirtualPage({
  identifier: 'feed',
  template: 'feed',
  posts: posts.slice(0, 20),
});

authors.children.forEach(author => {
  const authorId = path.basename(author.url);
  feed.addVirtualPage({
    identifier: `feed/${authorId}`,
    template: 'feed',
    posts: posts
      .filter(post => post.authors.split(/\s*,\s*/).includes(authorId))
      .slice(0, 20),
  });
});

module.exports = instance;
