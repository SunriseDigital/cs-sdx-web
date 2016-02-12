var webpack = require("webpack");
var envdev = require('envdev');

module.exports = {
  entry: __dirname + '/app.es6',
  output: {
      path: __dirname + '/../../../js',
      filename: 'scaffold.js'
  },
  resolve: {
    extensions: ['', ".js", ".es6"]
  },
  externals: {
  },
  watch: true,
  devtool: envdev.isDev() ? "#inline-source-map" : undefined,
  module: {
    loaders: [{
      test: /\.es6?$/,
      loader: 'babel',
      query:
      {
          presets:['es2015']
      },
      exclude: /node_modules/
    }]
  },
  plugins: envdev.isDev() ? [
    //prod
  ] : [
    //dev
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}