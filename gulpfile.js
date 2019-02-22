const path = require('path');
const cms = require('cms');
const consolidate = require('consolidate');
const markdown = require('markdown-it')().use(require('markdown-it-footnote')).use(require('markdown-it-highlightjs')).use(require('markdown-it-sub'));
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupMediaQueries = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const minifyHtml = require('gulp-htmlmin');
const importOnce = require('node-sass-import-once');
const moment = require('moment');
const striptags = require('striptags');

const vendor = path.resolve(__dirname, 'node_modules');
const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');

gulp.task('html', () => {
  return gulp.src(path.resolve(output, '**/*.html')).pipe(minifyHtml({
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  })).pipe(gulp.dest(output));
});

gulp.task('css', () => {
  return gulp.src(path.resolve(src, 'scss', 'style.scss')).pipe(sass({
    importer: importOnce
  })).pipe(autoprefixer({
    browsers: [
      'last 2 versions'
    ]
  })).pipe(groupMediaQueries()).pipe(cleanCss()).pipe(gulp.dest(path.resolve(output, 'css')));
});

gulp.task('js', () => {
  return gulp.src([
    path.resolve(vendor, 'vanilla-lazyload', 'dist', 'lazyload.js'),
    path.resolve(src, 'js', 'scripts.js')
  ]).pipe(babel()).pipe(uglify()).pipe(concat('scripts.js')).pipe(gulp.dest(path.resolve(output, 'js')));
});

gulp.task('cms', () => cms({
  permalink: (permalink) => `${permalink}/`,
  template: consolidate.pug,
  paths: {
    content: content,
    templates: templates,
    output: output
  },
  extensions: {
    templates: [
      'pug'
    ]
  },
  addons: {
    markdown: (input) => markdown.render(input),
    formatDate: (timestamp, pattern) => moment(timestamp, 'X').format(pattern),
    stripTags: (input) => striptags(input)
  },
  globals: {
    site: 'Frontend Development'
  },
  shortcodes: {
    image: (attrs, page) => {
      const image = page.images.find((item) => item.url.endsWith(`/${attrs.image}`));
      if (image) {
        const width = attrs.width || image.width;
        const height = attrs.height || image.height;
        const modifiers = [];
        if (attrs.bordered) {
          modifiers.push('bordered');
        }
        return `
          <span class="image${modifiers.length ? ` ${modifiers.map((modifier) => `image--${modifier}`).join(' ')}`: ''}">
            <img data-src="${image.url}" alt="${attrs.title || image.title || image.alt || ''}"${width ? ` width="${width || ''}"` : ''}${height ? ` height="${height || ''}"` : ''}${attrs.title ? ` title="${attrs.title || ''}"` : ''}>
          </span>
        `;
      } else {
        throw new Error(`Missing image: ${attrs.image}`);
      }
    },
    math: (attrs) => `<span class="math">${attrs.math.replace(/\|LEFT_PARENTHESIS\|/g, '(').replace(/\|RIGHT_PARENTHESIS\|/g, ')')}</span>`,
  }
}).render());

gulp.task('content', gulp.series('cms', 'html'));

gulp.task('assets', () => {
  return Promise.all([
    gulp.src(path.resolve(src, 'favicon.ico')).pipe(gulp.dest(output)),
    gulp.src(path.resolve(src, 'CNAME')).pipe(gulp.dest(output)),
    gulp.src(path.resolve(src, 'img', '**', '*')).pipe(gulp.dest(path.resolve(output, 'img'))),
  ]);
});

gulp.task('build', gulp.parallel('content', 'css', 'js', 'assets'));

gulp.task('dev', gulp.series('build'), () => {
  gulp.watch([
    path.resolve(content, '**/*'),
    path.resolve(templates, '**/*'),
    path.resolve(src, 'scss', '**/*'),
    path.resolve(src, 'components', '**/*'),
    path.resolve(src, 'js', '**/*')
  ], gulp.series('build'));
});
