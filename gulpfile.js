var fs = require('fs'),
  gulp = require('gulp'),
  addsrc = require('gulp-add-src'),
  bower = require('gulp-bower'),
  autoprefixer = require('gulp-autoprefixer'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch');

// Setup directories to work with
var dirs = {
  src: {
    bower: 'bower_components',
    js: 'source/javascripts',
    sass: 'source/styles'
  },

  dest: {
    js: 'js',
    css: 'css'
  }
};

// Cleanup target dirs
gulp.task('clean', function () {
  gulp.src([dirs.dest.css, dirs.dest.js])
    .pipe(clean({
      force: true
    }));
});

// Get bower stuff
gulp.task('bower', function () {
  var cmd = fs.exists(dirs.src.bower) ? 'update' : 'install';
  return bower({cmd: cmd});
});

// Build CSS from SASS
gulp.task('css', function () {
  gulp.src(dirs.src.sass + '/main.scss')
    .pipe(sass({
      onError: function (err) {
        return notify().write(err);
      }
    }))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(dirs.dest.css));
});

// Build JS
gulp.task('js', function () {
  gulp.src([
    // Manual cherry pick...
    dirs.src.bower + '/rainbow/js/rainbow.js',
    dirs.src.bower + '/rainbow/js/language/generic.js',
    dirs.src.bower + '/rainbow/js/language/javascript.js',
    dirs.src.bower + '/rainbow/js/language/html.js',
    dirs.src.bower + '/rainbow/js/language/css.js',
    dirs.src.bower + '/rainbow/js/language/shell.js'
  ])
    .pipe(addsrc([dirs.src.js + '/main.js']))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dest.js));
});

gulp.task('watch', function () {
  gulp.watch(dirs.src.sass + '/**/*.scss', ['css']);
  gulp.watch(dirs.src.js + '/**/*.js', ['js']);
});

gulp.task('build', ['clean', 'bower', 'css', 'js']);

gulp.task('dev', ['build', 'watch']);

gulp.task('default', ['build']);
