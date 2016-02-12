'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');

gulp.task('build-scaffold', function() {
  webpack(require('./js/scaffold/webpack.config.js'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({}));
  });
});


gulp.task('scaffold', ['build-scaffold']);