const path = require('path');
const cms = require('cms');
const consolidate = require('consolidate');
const markdown = require('markdown-it')().use(require('markdown-it-footnote')).use(require('markdown-it-highlightjs'));
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const minifyHtml = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const importOnce = require('node-sass-import-once');
const moment = require('moment');

const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');

gulp.task('html', () => {
  gulp.src(path.resolve(output, '**/*.html')).pipe(minifyHtml({
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  })).pipe(gulp.dest(output));
});

gulp.task('css', () => {
  gulp.src(path.resolve(src, 'scss', 'style.scss')).pipe(sass({
    importer: importOnce
  })).pipe(autoprefixer({
    browsers: [
      'last 2 versions'
    ]
  })).pipe(cleanCss()).pipe(gulp.dest(path.resolve(output, 'css')));
});

gulp.task('js', () => {
  gulp.src(path.resolve(src, 'js', 'scripts.js')).pipe(babel()).pipe(uglify()).pipe(gulp.dest(path.resolve(output, 'js')));
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
    formatDate: (timestamp, pattern) => moment(timestamp, 'X').format(pattern)
  },
  globals: {
    site: 'Frontend Development'
  }
}));

gulp.task('content', (done) => {
  runSequence('cms', 'html', done);
});

gulp.task('assets', () => {
  gulp.src(path.resolve(src, 'favicon.ico')).pipe(gulp.dest(output));
  gulp.src(path.resolve(src, 'CNAME')).pipe(gulp.dest(output));
  gulp.src(path.resolve(src, 'img', '**/*')).pipe(gulp.dest(path.resolve(output, 'img')));
});

gulp.task('build', [
  'content',
  'css',
  'js',
  'assets'
]);

gulp.task('dev', [
  'build'
], () => {
  gulp.watch([
    path.resolve(content, '**/*'),
    path.resolve(templates, '**/*'),
    path.resolve(src, 'scss', '**/*'),
    path.resolve(src, 'components', '**/*'),
    path.resolve(src, 'js', '**/*')
  ], [
    'build'
  ]);
});
