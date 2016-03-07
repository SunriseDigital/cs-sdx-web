'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var compass = require('gulp-compass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');

gulp.task('build-sass', function() {
  return gulp.src(['sass/*.scss', 'sass/**/*.scss'])
    .pipe(compass({
      css: '../css',
      sass: 'sass',
      image: '../img'
    }))
    .on('error', function(error){
      notifier.notify({
        title: error.plugin,
        message: error.message
      });
      this.emit('end');
    })
    .pipe(gulp.dest('../css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('../css'))
    ;
});

gulp.task('watch-sass', function() {
  gulp.watch(['sass/*.scss', 'sass/**/*.scss'], ['build-sass']);
});

gulp.task('build-scaffold', function() {
  var config = require('./js/scaffold/webpack.config.js');
  webpack(config, function(err, stats) {
    //notifier
    if (stats.compilation.errors.length) {
      notifier.notify({
        title: 'Webpack',
        message: stats.compilation.errors[0].message
      });
    }

    //console log
    gutil.log("[webpack]", stats.toString({}));

    //uglify
    gulp.src(config.output.path + '/' + config.output.filename)
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify({
        preserveComments: 'license'
      }))
      .pipe(gulp.dest('../js'))
  });
});




gulp.task('scaffold', ['build-scaffold', 'watch-sass']);