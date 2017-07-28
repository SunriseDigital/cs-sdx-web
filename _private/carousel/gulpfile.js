var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var notifier = require('node-notifier');
var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');

function logError(error){
  notifier.notify({
    title: error.plugin,
    message: error.message
  })

  gutil.log(error)
}

gulp.task('build-sass', function() {
  return gulp.src(['sass/*.scss', 'sass/**/*.scss'])
    .pipe(compass({
      css: '../../css',
      sass: 'sass',
    }))
    .on('error', logError)
    .pipe(gulp.dest('../../carousel'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .on('error', logError)
    .pipe(gulp.dest('../../carousel'))
    ;
});

gulp.task('watch-sass', function() {
  gulp.watch(['sass/*.scss', 'sass/**/*.scss']);
});

gulp.task('build-src', function() {
  var config = require('./js/webpack.config.js');
  return gulp.src('js/app.js')
    .pipe(webpackStream(config, webpack))
    .on('error', logError)
    .pipe(gulp.dest('../../carousel'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .on('error', logError)
    .pipe(gulp.dest('../../carousel'))
});


gulp.task('default', ['build-sass', 'watch-sass', 'build-src'])