// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// File pass variables
const files = {
  scssPath: 'app/scss/**/*.scss', // any file with .scss
  jsPath: 'app/js/**/*.js', // any file with .js
};
// Sass task to compile sass files
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Error...',
          message: '<%= error.message %>',
        }),
      })
    )
    .pipe(sass({ outputStyle: 'compressed', errLogToConsole: false }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'));
}
// JS task minify JS file
function jsTask() {
  return src(files.jsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist'));
}

// Cachebusting task
const cbString = new Date().getTime();
function cacheBustingTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}
// Watch task
function watchTask() {
  watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

// Default task
exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustingTask,
  watchTask
);
