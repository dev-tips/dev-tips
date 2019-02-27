const path = require('path');
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
const cms = require('./cms');

const vendor = path.resolve(__dirname, 'node_modules');
const src = path.resolve(__dirname, 'src');
const content = path.resolve(src, 'content');
const templates = path.resolve(src, 'templates');
const output = path.resolve(__dirname, 'build');

gulp.task('html', () => gulp.src(path.resolve(output, '**/*.html')).pipe(minifyHtml({
  removeComments: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
})).pipe(gulp.dest(output)));

gulp.task('css', () => gulp.src(path.resolve(src, 'scss', 'style.scss')).pipe(sass({
  importer: importOnce,
})).pipe(autoprefixer({
  browsers: [
    'last 2 versions',
  ],
})).pipe(groupMediaQueries())
  .pipe(cleanCss())
  .pipe(gulp.dest(path.resolve(output, 'css'))));

gulp.task('js', () => gulp.src([
  path.resolve(vendor, 'vanilla-lazyload', 'dist', 'lazyload.js'),
  path.resolve(src, 'js', 'scripts.js'),
]).pipe(babel()).pipe(uglify()).pipe(concat('scripts.js'))
  .pipe(gulp.dest(path.resolve(output, 'js'))));

gulp.task('cms', () => cms.render());

gulp.task('content', gulp.series('cms', 'html'));

gulp.task('assets', () => Promise.all([
  gulp.src(path.resolve(src, 'favicon.ico')).pipe(gulp.dest(output)),
  gulp.src(path.resolve(src, 'CNAME')).pipe(gulp.dest(output)),
  gulp.src(path.resolve(src, 'img', '**', '*')).pipe(gulp.dest(path.resolve(output, 'img'))),
]));

gulp.task('build', gulp.parallel('content', 'css', 'js', 'assets'));

gulp.task('dev', gulp.series('build'), () => {
  gulp.watch([
    path.resolve(content, '**/*'),
    path.resolve(templates, '**/*'),
    path.resolve(src, 'scss', '**/*'),
    path.resolve(src, 'components', '**/*'),
    path.resolve(src, 'js', '**/*'),
  ], gulp.series('build'));
});
