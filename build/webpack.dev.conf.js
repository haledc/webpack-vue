const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')

const webpackDevConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
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
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    overlay: {
      errors: true
    },
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join('/', 'index.html')
      }]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackDevConfig
