var gulp = require('gulp');
var cf = require('./config.json');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var pump = require('pump');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var kit = require('gulp-kit');
var removeEmptyLines = require('gulp-remove-empty-lines');
var series = require('stream-series');
var inject = require('gulp-inject');
var replace = require('gulp-replace-path');
var svgSprite = require("gulp-svg-sprites");
var svgmin = require('gulp-svgmin');
var rename = require("gulp-rename");
var htmlreplace = require("gulp-html-replace");
var concat = require('gulp-concat');
var zip = require("gulp-zip");


var config = {
  // base: './',
  // ext: 'html',
  // env: {
  //   server: './dev',
  //   serverDist: './dist'
  // },
  runTimestamp: Math.round(Date.now() / 1000),
  iconFontName: 'ibbc-font',
  iconFontClass: 'ibbc-icon',
  iconSpriteName: 'ibbc-sprite'
};

var paths = {
  dev: {
    root: 'dev/',
    files: 'dev/*.' + cf.extension,
    kitAllFiles: 'dev/kit/**/*.kit',
    kitPartialsHead: 'dev/kit/partials/_head.kit',
    kitPartials: 'dev/kit/partials',
    kitFiles: 'dev/kit/*.kit',
    extras: ['.htaccess', 'crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico', 'README.md'],
    images: 'dev/images/',
    icons: './dev/icons/',
    imagesFiles: 'dev/images/**/*.+(png|jpg|gif)',
    fonts: 'dev/fonts/**/*',
    css: 'dev/css/',
    cssMainFile: 'dev/css/styles.css',
    scss: 'dev/scss',
    scssIndex: 'dev/scss/styles.scss',
    scssFiles: 'dev/scss/**/*.scss',
    js: 'dev/js',
    jsAppFiles: 'dev/js/*.js',
    jsFiles: [
      'dev/js/**/*.js',
      '!./dev/js/lib/**/*.js'
    ],
    jsLibs: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/svg4everybody/dist/svg4everybody.js'
      // 'node_modules/mustache/mustache.js',
      // 'node_modules/slick-carousel/slick/slick.js'
    ],
    jsLibFolder: 'dev/js/lib',
    jsLibFiles: 'dev/js/lib/*.js',
    svgIcons: 'dev/images/icons/icons-font/*.svg',
    svgIconsSprites: 'dev/images/icons/icons-sprite/*.svg',
    svgScss: '../scss/icon-font/_icon-font.scss',
    svgFonts: '../fonts/',
    spriteSvgScss: './scss/sprite-svg/_sprite.scss',
    svgSprite: 'images/ibbc-sprite.svg',
    svgFontsTemplate: './dev/scss/icon-font/templates/_icons.scss',
    svgFontsDev: 'dev/fonts/'
  },
  dist: {
    root: 'dist/',
    images: 'dist/images/',
    fonts: 'dist/fonts',
    css: 'dist/css',
    js: 'dist/js'
  }
}


gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: cf.server.development
    }
  });
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: cf.server.production
    }
  });
});


gulp.task('concat:libs', ['minify'], function () {
  return gulp.src('./tmp/js/lib/*.js')
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./tmp/concat/'))
});

gulp.task('concat:scripts', ['concat:libs'], function () {
  return gulp.src('./tmp/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./tmp/concat'))
});

gulp.task('minify:scripts', ['concat:scripts'], function () {
  return gulp.src('./tmp/concat/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('htmlreplace', function () {
  gulp.src('dist/*.html')
    .pipe(htmlreplace({
      'css': 'css/styles.min.css',
      'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify', function (cb) {
  pump([
    gulp.src('dev/js/**/*.js'),
    uglify(),
    gulp.dest('tmp/js')
  ],
    cb
  );
});

// SCSS
function handleErrors() {
  var gutil = require('gulp-util');
  var args = Array.prototype.slice.call(arguments);

  gutil.log(gutil.colors.white.bgRed.underline.bold('Gulp error:'));
  gutil.log(gutil.colors.red(args));

  // continue with gulp tasks
  this.emit('end');
}

gulp.task('scss', function () {

  var postCssOpts = [
    assets({ loadPaths: [paths.dev.images] }),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }),
    mqpacker,
    cssnano
  ];

  gulp.src(paths.dev.scssIndex)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postCssOpts))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: paths.dev.scss }))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dev.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('inject', function () {
  var target = gulp.src(paths.dev.kitPartialsHead);
  var sources = gulp.src(paths.dev.cssMainFile, { read: false });
  var vendorStream = gulp.src([paths.dev.jsLibFiles], { read: false });
  var appStream = gulp.src([paths.dev.jsAppFiles], { read: false });

  return target.pipe(inject(series(sources, vendorStream, appStream)))
    .pipe(replace(/\/dev\//g, ''))
    .pipe(gulp.dest(paths.dev.kitPartials));
});

gulp.task('kit', function () {
  return gulp.src(paths.dev.kitFiles)
    .pipe(kit({ compilePartials: true }))
    .pipe(removeEmptyLines({
      removeComments: false,
      removeSpaces: false
    }))
    .pipe(gulp.dest(paths.dev.root))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// IMAGES
gulp.task('images', function () {
  gulp.src(['dev/images/**/*', '!dev/images/**/*.svg'])
    .pipe(changed(paths.dist.images))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// JSHINT
gulp.task('jshint', function () {
  return gulp.src(paths.dev.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CLEAN
gulp.task('clean:dist', function () {
  return gulp.src(paths.dist.root, { read: false })
    .pipe(clean());
});

// BORRO HTML
gulp.task('clean:html', function () {
  return gulp.src(paths.dev.files, { read: false })
    .pipe(clean());
});

// CLEAN JS
gulp.task('clean:tmp', function () {
  return gulp.src('tmp/', { read: false })
    .pipe(clean());
});

// IMPORT LIBARIES
gulp.task('import:libs', function () {
  gulp.src(paths.dev.jsLibs)
    .pipe(gulp.dest(paths.dev.jsLibFolder));
});

// COPY
gulp.task('copy:files', function () {
  gulp.src(paths.dev.root + '*.*', {
    base: paths.dev.root
  })
    .pipe(gulp.dest(paths.dist.root));

  gulp.src(paths.dev.fonts)
    .pipe(changed(paths.dist.fonts))
    .pipe(gulp.dest(paths.dist.fonts));

  gulp.src('dev/css/*')
    .pipe(gulp.dest('dist/css'));

  gulp.src('dev/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('rename:css', function () {
  gulp.src('dist/css/styles.css')
    .pipe(vinylPaths(del))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// ICONS SVG
gulp.task('iconfont', function () {
  return gulp.src([paths.dev.svgIcons])
    .pipe(iconfontCss({
      fontName: config.iconFontName,
      path: paths.dev.svgFontsTemplate,
      targetPath: paths.dev.svgScss,
      fontPath: paths.dev.svgFonts,
      firstGlyph: 0xB001,
      cssClass: config.iconFontClass
    }))
    .pipe(iconfont({
      fontName: config.iconFontName,
      prependUnicode: true,
      normalize: true,
      fontHeight: 1001,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: config.runTimestamp,
    }))
    .pipe(gulp.dest(paths.dev.svgFontsDev))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// SPRITES SVG
gulp.task('sprites', function () {
  return gulp.src([paths.dev.svgIconsSprites])
    .pipe(svgSprite({
      svg: {
        sprite: paths.dev.svgSprite
      },
      common: config.iconSpriteName,
      preview: true,
      padding: 10,
      templates: { css: false, scss: true },
      cssFile: paths.dev.spriteSvgScss
    }))
    .pipe(gulp.dest(paths.dev.root));
});

// OPTIMIZA SVG y PRETTIFY
gulp.task('svgo', ['sprites'], function () {
  return gulp.src('./dev/images/ibbc-sprite.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(rename('ibbc-sprite-pretty.svg'))
    .pipe(gulp.dest('./dev/images'));
});

gulp.task('optimize:svg', function () {
  return gulp.src('./dev/images/icons/**/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest('./dev/images/icons'));
});

gulp.task('zip', function () {
  gulp.src(cf.zip.src)
    .pipe(zip(cf.zip.name))
    .pipe(gulp.dest(cf.zip.dest))
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch(paths.dev.files, browserSync.reload);
  gulp.watch(paths.dev.svgIcons, ['iconfont']);
  gulp.watch(paths.dev.scssFiles, ['scss']);
  gulp.watch(paths.dev.kitAllFiles, ['kit']);
  gulp.watch(paths.dev.svgIconsSprites, ['sprites']);
  gulp.watch(paths.dev.jsFiles, ['jshint']);
});

gulp.task('dev', function () {
  runSequence(
    'clean:html',
    ['import:libs', 'optimize:svg'],
    ['iconfont', 'sprites', 'scss'],
    ['inject'],
    ['kit'],
    ['browserSync', 'watch']
  );
});

gulp.task('build', function () {
  runSequence(
    'clean:dist',
    'copy:files',
    ['minify:scripts'],
    ['clean:tmp'],
    ['rename:css'],
    ['htmlreplace'],
    ['images'],
    'serve'
  );
});

gulp.task('default', ['dev']);
