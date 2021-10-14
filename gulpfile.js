const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('node-sass'));
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const header = require('gulp-header');
const gcmq = require('gulp-group-css-media-queries');
const minifyHtml = require('gulp-htmlmin');

const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');
const vendor = path.resolve(__dirname, 'node_modules');

const cms = require('./cms');
const fonts = require('./src/fonts');

function html() {
  return gulp
    .src([
      path.resolve(output, '**', '*.html'),
      `!${path.resolve(output, 'sitemap.xml', '*.html')}`,
      `!${path.resolve(output, 'ifttt', '**', '*.html')}`,
      `!${path.resolve(output, 'feed', '**', '*.html')}`,
    ])
    .pipe(
      minifyHtml({
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }),
    )
    .pipe(gulp.dest(output));
}

function css() {
  return gulp
    .src(path.resolve(src, 'scss', 'style.scss'))
    .pipe(
      header(
        `$fonts: ${JSON.stringify(fonts)
          .replace(/\{|\[/g, '(')
          .replace(/\}|\]/g, ')')};`,
      ),
    )
    .pipe(sass())
    .pipe(gcmq())
    .pipe(postcss())
    .pipe(gulp.dest(path.resolve(output, 'assets', 'css')));
}

function js() {
  return gulp
    .src([
      path.resolve(vendor, 'lozad', 'dist', 'lozad.min.js'),
      path.resolve(vendor, 'instant.page', 'instantpage.js'),
      path.resolve(src, 'js', 'scripts.js'),
    ])
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(path.resolve(output, 'assets', 'js')));
}

function pages() {
  return cms.render();
}

function assets() {
  return Promise.all([
    gulp
      .src([path.resolve(src, '.htaccess'), path.resolve(src, 'favicon.ico')])
      .pipe(gulp.dest(output)),
    gulp
      .src(path.resolve(src, 'img', '**', '*'))
      .pipe(gulp.dest(path.resolve(output, 'assets', 'img'))),
    gulp
      .src(path.resolve(src, 'fonts', '**', '*.{woff,woff2}'))
      .pipe(gulp.dest(path.resolve(output, 'assets', 'fonts'))),
  ]);
}

const build = gulp.parallel(gulp.series(pages, html), css, js, assets);

function watch() {
  gulp.watch(
    [
      path.resolve(content, '**', '*'),
      path.resolve(templates, '**', '*'),
      path.resolve(src, 'scss', '**', '*'),
      path.resolve(src, 'js', '**', '*'),
    ],
    build,
  );
}

gulp.task('build', build);

gulp.task('dev', gulp.series(build, watch));

gulp.task('default', build);
