var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var changed = require('gulp-changed');
var combineMq = require('gulp-combine-mq');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var path = require('path');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

// Setup directories to work with
var dirs = {
  build: 'build',
  src: {
    images: 'source/images',
    bower: 'bower_components',
    js: 'source/javascripts',
    sass: 'source/styles'
  },
  dest: {
    images: 'images',
    js: 'js',
    css: 'css'
  }
};

// Get bower stuff
gulp.task('bower', function () {
  return bower({
    directory: dirs.src.bower,
    cmd: fs.existsSync(dirs.src.bower) ? 'update' : 'install'
  });
});

// Copy source images to destination, leaving out sprites
gulp.task('copy-images', function () {
  return gulp.src([dirs.src.images + '/**/*.?(png|gif|jpg|webp|svg)', '!' + dirs.src.images + '/sprite*/**/*'])
    .pipe(changed(dirs.dest.images))
    .pipe(gulp.dest(dirs.dest.images));
});

// Build CSS
gulp.task('css', function () {
  return gulp.src([dirs.src.sass + '/main.scss'])
    .pipe(sass({
      imagePath: dirs.dest.images,
      outputStyle: 'nested'
    }))
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'Error during SASS compilation'
    }))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(combineMq())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dirs.dest.css));
});

// Release: minify CSS
gulp.task('css-release', ['css'], function () {
  gulp.src(dirs.dest.css + '/app.css')
    .pipe(cssmin())
    .pipe(gulp.dest(dirs.dest.css));
});

// Build JS
gulp.task('js', ['bower'], function () {
  return gulp.src([
    // Manual cherry pick...
    dirs.src.bower + '/rainbow/js/rainbow.js',
    dirs.src.bower + '/rainbow/js/language/generic.js',
    dirs.src.bower + '/rainbow/js/language/javascript.js',
    dirs.src.bower + '/rainbow/js/language/html.js',
    dirs.src.bower + '/rainbow/js/language/css.js',
    dirs.src.bower + '/rainbow/js/language/shell.js',
    dirs.src.js + '/main.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dirs.dest.js));
});

// Release: minify JS
gulp.task('js-release', ['js'], function () {
  gulp.src(dirs.dest.js + '/app.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest(dirs.dest.js));
});

// Main task: watch
gulp.task('watch', ['build'], function () {
  // Watch images
  watch(dirs.src.images + '/**/*.?(png|gif|jpg|webp|svg)', function (files, cb) {
    gulp.start('copy-images', cb);
  });

  // Watch CSS
  watch(dirs.src.sass + '/**/*.scss', function (files, cb) {
    gulp.start('css', cb);
  });

  // Watch JS
  watch(dirs.src.js + '/**/*.js', function (files, cb) {
    gulp.start('js', cb);
  });
});

// Alias task: dev
gulp.task('dev', ['watch']);

// Main task: cleanup target dirs
gulp.task('clean', function (cb) {
  del([
    dirs.dest.images,
    dirs.dest.css,
    dirs.dest.js
  ], cb);
});

// Main task: build
gulp.task('build', [
  'copy-images',
  'css',
  'js'
]);

// Main task: release
gulp.task('release', [
  'copy-images',
  'css-release',
  'js-release'
], function () {
  // Wipe out build dir
  del([dirs.build]);

  // Minify images
  gulp.src(dirs.dest.images + '/*.?(png|gif|jpg)')
    .pipe(imagemin({
      optimizationLevel: 4,
      progressive: true
    }))
    .on('error', notify.onError({
      message: 'Please check all images for correct file extensions and file corruption. (Error: <%= error.message %>)',
      title: 'Error during image minification'
    }))
    .pipe(gulp.dest(dirs.dest.images));
});

// Main task: clean-release
gulp.task('clean-release', ['clean'], function () {
  gulp.start('release');
});

// Default task
gulp.task('default', ['build']);
