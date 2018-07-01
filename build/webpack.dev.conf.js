const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
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
  },
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/dist/index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = devConfig
