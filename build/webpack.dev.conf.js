const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const path = require('path')

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
    overlay: {
      errors: true
    },
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join('/', 'index.html')
      }]
    }
  }
})

module.exports = webpackDevConfig
