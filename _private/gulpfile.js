'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var minimist = require('minimist');

//gulp --env dev *** でminifyしないコードを出力可能です。
var args = minimist(process.argv);
var env = args.env ? args.env : 'prod';
process.env.PROD_DEV = env;

gulp.task('build-scaffold', function() {
  webpack(require('./js/scaffold/webpack.config.js'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({}));
  });
});


gulp.task('scaffold', ['build-scaffold']);