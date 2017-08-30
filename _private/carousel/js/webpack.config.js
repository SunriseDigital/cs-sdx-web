var webpack = require("webpack");

module.exports = {
  output: {
      filename: 'app.js'
  },
  resolve: {
    extensions: [".js"]
  },
  externals: [

  ],
  devtool: "#inline-source-map",
  watch: true,
  module: {
    rules: [{
      test: /(\.js$)/,
      loader: 'babel-loader',
      query:
      {
          presets:['es2015']
      },
      exclude: /node_modules/
    }]
  },
  plugins: []
}