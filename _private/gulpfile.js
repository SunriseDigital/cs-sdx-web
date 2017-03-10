'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');

////////////////////////////////////////
// util
var buildWebpack = function(config){
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
}

////////////////////////////////////////
// sass
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
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('../css'))
    ;
});

gulp.task('watch-sass', function() {
  gulp.watch(['sass/*.scss', 'sass/**/*.scss'], ['build-sass']);
});

gulp.task('sass', ['build-sass', 'watch-sass']);

////////////////////////////////////////
// scaffold
gulp.task('build-scaffold', function() {
  buildWebpack(require('./js/scaffold/webpack.config.js'));
});
gulp.task('scaffold', ['build-scaffold']);


////////////////////////////////////////
// static
// js/static内のファイルをコピーしてなおかつuglifyする。
var staticSources = [ 'js/static/*.js', 'js/static/**/*.js' ];
gulp.task('copy-static', function(){

  gulp.src(staticSources, { base: 'js/static' })
    .pipe( gulp.dest( '../js/static' ));

  gulp.src(staticSources, { base: 'js/static' })
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({
      preserveComments: 'license'
    }).on('error', function(err){
      notifier.notify({
        title: 'copy-static',
        message: err.cause.message
      });
      console.log(err);
    }))
    .pipe(gulp.dest('../js/static'))
});

gulp.task('watch-static', function(){
  gulp.watch(staticSources, ['copy-static']);
})

gulp.task('static', ['copy-static', 'watch-static']);

////////////////////////////////////////
// package
// package内でminのないものを生成する。

gulp.task('package-css-min', function(){
  gulp.src([
      '../package/jquery-file-upload/**/*.css', '!../package/jquery-file-upload/**/*.min.css',
      '../package/jquery-colorbox/**/*.css', '!../package/jquery-colorbox/**/*.min.css'
    ])
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }))
    ;
});

gulp.task('package-js-min', function(){
  gulp.src([
      '../package/jquery-file-upload/**/*.js', '!../package/jquery-file-upload/**/*.min.js'
    ])
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({
        preserveComments: 'license'
      }).on('error', function(err){
        notifier.notify({
          title: 'copy-static',
          message: err.cause.message
        });
        console.log(err);
      })
    )
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('package-min', ['package-css-min', 'package-js-min']);
