var fs = require('fs');
var path = require('path');
var eventStream = require('event-stream');
var del = require('del');
var Q = require('q');
var gulp = require('gulp');
var newer = require('gulp-newer');
var tap = require('gulp-tap');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var autoprefixer = require('gulp-autoprefixer');
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
gulp.task('clean', function (cb) {
  del([
    dirs.dest.css,
    dirs.dest.js
  ], cb);
});

// Get bower stuff
gulp.task('bower', function () {
  return bower({
    directory: dirs.src.bower,
    cmd: fs.existsSync(dirs.src.bower) ? 'update' : 'install'
  });
});

// Used to inform listeners that the current batch of files has been minified.
var imageMinificationDefer = Q.defer();

// Generate sprites, copy over other images & minify them all
gulp.task('images', function () {
  // Init stream with non-sprite images for minification
  var imageStream = gulp.src(dirs.src.images + '/*.*')
    .pipe(newer(dirs.dest.images));
  var scssStream;
  var scssDefer = Q.defer();

  // Generate one sprite per 'sprite*' directory
  var generateSprite = function (spriteName) {
    var sprite;
    var basePath = dirs.src.images + '/' + spriteName;
    var absBasePath = path.resolve(basePath);

    for (var i = 1; i <= 3; i++) {
      sprite = gulp.src(basePath + '/**/*@' + i + 'x.png')
        .pipe(spritesmith({
          imgName: spriteName + '@' + i + 'x.png',
          cssName: spriteName + '@' + i + 'x.scss',
          cssVarMap: function (sprite) {
            sprite.name = (path.join(spriteName, path.relative(absBasePath, path.dirname(sprite.source_image)))).replace('/', '-') + '-' + sprite.name.replace('@', '-');
            sprite.image = '/' + dirs.dest.images + '/' + sprite.image;
          }
        }));

      var spritePipe = sprite.css.pipe(gulp.dest(dirs.build + '/sprite-sass'));
      scssStream = scssStream ? eventStream.merge(scssStream, spritePipe) : spritePipe;
      imageStream = eventStream.merge(imageStream, sprite.img);
    }
  };

  gulp.src(dirs.src.images + '/sprite*')
    .pipe(tap(function (directory) {
      generateSprite(path.basename(directory.path));
    }))
    .on('end', function () {
      // Minify images
      imageStream
        .pipe(imagemin({
          optimizationLevel: 4,
          progressive: true
        }))
        .on('error', notify.onError({
          message: 'Please check for correct file extensions and file corruption. (Error: <%= error.message %>)',
          title: 'Error during image minification'
        }))
        .pipe(gulp.dest(dirs.dest.images))
        .on('end', function () {
          imageMinificationDefer.resolve();
        });

      // Touch shadow files
      scssStream.on('end', function () {
        scssDefer.resolve();
      });
    });

  return scssDefer.promise;
});

gulp.task('images-minify-resolver', function () {
  return imageMinificationDefer.promise;
});

// Build CSS from SASS
gulp.task('css', ['clean', 'images'], function () {
  return gulp.src([dirs.src.sass + '/main.scss'])
    .pipe(sass({
      includePaths: [
        dirs.src.sass,
        dirs.build + '/sprite-sass'
      ],
      imagePath: dirs.dest.images,
      outputStyle: 'nested'
    }))
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'Error during SASS compilation'
    }))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dirs.dest.css));
});

// Minify CSS
gulp.task('css-release', ['css'], function () {
  gulp.src(dirs.dest.css + '/app.css')
    .pipe(cssmin())
    .pipe(gulp.dest(dirs.dest.css));
});

// Build JS
gulp.task('js', ['clean', 'bower'], function () {
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

// Minify JS
gulp.task('js-release', ['js'], function () {
  gulp.src(dirs.dest.js + '/app.js')
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dest.js));
});

gulp.task('watch', ['build'], function () {
  watch(dirs.src.js + '/**/*.js', function (files, cb) {
    gulp.start('js', cb);
  });
  watch([
    dirs.src.sass + '/**/*.scss',
    dirs.src.images + '/**/*'
  ], function (files, cb) {
    var cssCompleteDefer = Q.defer();
    imageMinificationDefer = Q.defer();
    gulp.start('css', function () {
      cssCompleteDefer.resolve();
    });

    Q(imageMinificationDefer.promise, cssCompleteDefer.promise).then(cb);
  });
});

// Just an alias for watch. Keeping this separate in case we
// need it some time.
gulp.task('dev', ['watch']);

gulp.task('build', [
  'css',
  'js',
  'images-minify-resolver'
]);

gulp.task('release', [
  'css-release',
  'js-release',
  'images-minify-resolver'
]);

gulp.task('default', ['build']);
