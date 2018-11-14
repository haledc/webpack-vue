const merge = require('webpack-merge')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const path = require('path')

const webpackProdConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[id]-[contenthash:8].css'
    }),
    new OptimizeCSSAssentPlugin(),
    new CleanWebpackPlugin(
      [path.join(__dirname, '../dist/')],
      {
        root: path.join(__dirname, '../')
      }
    )
  ]
})

module.exports = webpackProdConfig
