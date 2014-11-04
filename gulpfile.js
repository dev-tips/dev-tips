var fs = require('fs');
var del = require('del');
var eventStream = require('event-stream');
var gulp = require('gulp');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var notify = require("gulp-notify");
var addsrc = require('gulp-add-src');
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
gulp.task('clean', function(cb) {
  del([dirs.dest.css, dirs.dest.js], cb);
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
    sprite.name = 'sprite-' + sprite.name.replace(/@/, '-');
    sprite.image = '/' + dirs.dest.images + '/' + sprite.image;
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
  var imageStream = gulp.src(dirs.src.images + '/*.*');
  var scssStream;

  [sprite1x, sprite2x, sprite3x].forEach(function (sprite) {
    imageStream = eventStream.merge(imageStream, sprite.img);

    var spritePipe = sprite.css.pipe(gulp.dest(dirs.build + '/sprite-sass'));
    scssStream = scssStream ? eventStream.merge(scssStream, spritePipe) : spritePipe;
  });

  imageStream
    .pipe(imagemin({
      optimizationLevel: 4,
      progressive: true,
      use: [
        require('imagemin-advpng')({optimizationLevel: 4}),
        require('imagemin-pngcrush')({reduce: true})
      ]
    }))
    .on('error', notify.onError({
      message: 'Please check for correct file extensions and file corruption. (Error: <%= error.message %>)',
      title: 'Error during image minification'
    }))
    .pipe(gulp.dest(dirs.dest.images));

  return scssStream;
});

// Build CSS from SASS
gulp.task('css', function () {
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

// Minify js
gulp.task('css-min', function () {
  gulp.src(dirs.dest.css + '/app.css')
    .pipe(cssmin())
    .pipe(gulp.dest(dirs.dest.css));
});

// Build JS
gulp.task('js', function () {
  return gulp.src([
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
  gulp.watch(dirs.src.images + '/**/*', ['images-css'])
});

gulp.task('build', function () {
  runSequence(
    'clean',
    'bower',
    'images',
    'css',
    'js'
  );
});

gulp.task('dev', [
  'build',
  'watch'
]);

gulp.task('release', function () {
  runSequence(
    'clean',
    'bower',
    'images',
    'css',
    'css-min',
    'js',
    'js-min'
  );
});

gulp.task('default', ['build']);
