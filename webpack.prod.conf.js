const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  plugins: [
    // html 插件
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      // html压缩
      minify: {
        // 去掉空格
        collapseWhitespace: true,
        // 去掉评论
        removeComments: true,
        // 去掉属性引号
        removeAttributeQuotes: true
      }
    }),
    // css 压缩
    new OptimizeCSSAssentPlugin({}),
  ]
})