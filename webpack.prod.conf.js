const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  plugins: [
    new htmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new OptimizeCSSPlugin()
  ]
})