var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('clean', function() {
  gulp.src('js')
    .pipe(addsrc('css'))
    .pipe(clean({
      force: true
    }));
});

gulp.task('css', function() {
  gulp.src('scss/style.scss')
    .pipe(sass({
      onError: function(err) {
        return notify().write(err);
      }
    }))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(cssmin())
    .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
  gulp.src('vendor/rainbow/js/rainbow.js')
    .pipe(addsrc('vendor/rainbow/js/language/generic.js'))
    .pipe(addsrc('vendor/rainbow/js/language/javascript.js'))
    .pipe(addsrc('vendor/rainbow/js/language/html.js'))
    .pipe(addsrc('vendor/rainbow/js/language/css.js'))
    .pipe(addsrc('vendor/rainbow/js/language/shell.js'))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
});

gulp.task('build', ['clean', 'css', 'js']);

gulp.task('dev', ['build', 'watch']);

gulp.task('default', ['build']);
