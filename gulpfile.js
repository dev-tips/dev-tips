var fs = require('fs');
var eventStream = require('event-stream');
var gulp = require('gulp');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var notify = require("gulp-notify");
var addsrc = require('gulp-add-src');
var bower = require('gulp-bower');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
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

// Cleanup target dirs
gulp.task('clean', function () {
  gulp.src([
    dirs.dest.css,
    dirs.dest.js
  ])
    .pipe(clean({
      force: true
    }));
});

// Get bower stuff
gulp.task('bower', function () {
  return bower({
    cmd: fs.exists(dirs.src.bower) ? 'update' : 'install'
  });
});

// Generate sprites, copy over other images & minify them all
gulp.task('images', function () {
  var cssVarMapper = function (sprite) {
    // Get rid of @-sign in SCSS variables
    sprite.name = 'sprite-' + sprite.name.replace(/@/, '-');
  };

  // @1x
  var sprite1x = gulp.src(dirs.src.images + '/sprite/*@1x.png')
    .pipe(spritesmith({
      imgName: 'sprite@1x.png',
      cssName: 'sprite@1x.scss',
      cssVarMap: cssVarMapper
    }));

  // @2x
  var sprite2x = gulp.src(dirs.src.images + '/sprite/*@2x.png')
    .pipe(spritesmith({
      imgName: 'sprite@2x.png',
      cssName: 'sprite@2x.scss',
      cssVarMap: cssVarMapper
    }));

  // @3x
  var sprite3x = gulp.src(dirs.src.images + '/sprite/*@3x.png')
    .pipe(spritesmith({
      imgName: 'sprite@3x.png',
      cssName: 'sprite@3x.scss',
      cssVarMap: cssVarMapper
    }));

  // Init merged stream with other images
  var mergedImageStream = gulp.src(dirs.src.images + '/*.*');

  [sprite1x, sprite2x, sprite3x].forEach(function (sprite) {
    mergedImageStream = eventStream.merge(mergedImageStream, sprite.img);

    // Note: This is actually a SCSS file...
    sprite.css && sprite.css
      .pipe(gulp.dest(dirs.build + '/sprite-sass'));
  });

  mergedImageStream
    .pipe(imagemin({
      optimizationLevel: 4,
      progressive: true,
      use: [
        require('imagemin-advpng')({optimizationLevel: 4}),
        require('imagemin-pngcrush')({reduce: true})
      ]
    }))
    .on('error', notify.onError({
      message: "Please check for correct file extensions and file corruption. (Error: <%= error.message %>)",
      title: "Error during image minification"
    }))
    .pipe(gulp.dest(dirs.dest.images));
});

// Build CSS from SASS
gulp.task('css', function () {
  gulp.src([dirs.src.sass + '/main.scss'])
    .pipe(sass({
      loadPath: [
        dirs.src.sass,
        dirs.build + '/sprite-sass'
      ],
      onError: notify.onError(function (error) {
        return error.message;
      })
    }))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dirs.dest.css));
});

// Minify js
gulp.task('css-min', function () {
  gulp.src(dirs.dest.css + '/app.css')
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
    .pipe(gulp.dest(dirs.dest.js));
});

// Minify js
gulp.task('js-min', function () {
  gulp.src(dirs.dest.js + '/app.js')
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dest.js));
});

gulp.task('watch', function () {
  gulp.watch(dirs.src.sass + '/**/*.scss', ['css']);
  gulp.watch(dirs.src.js + '/**/*.js', ['js']);
  gulp.watch(dirs.src.images + '/**/*', ['images', 'css'])
});

gulp.task('build', [
  'clean',
  'images',
  'bower',
  'css',
  'js'
]);

gulp.task('dev', [
  'build',
  'watch'
]);

gulp.task('release', function() {
  runSequence('build', 'css-min', 'js-min');
});

gulp.task('default', ['build']);
