const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const webpackDevConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          },
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        ]
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    hot: true,
    hotOnly: true,
    overlay: {
      errors: true
    },
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../template.html'),
      filename: 'index.html'
    })
  ]
})

module.exports = webpackDevConfig
