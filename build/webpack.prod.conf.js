const merge = require('webpack-merge')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

const webpackProdConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader, // 提取 CSS
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
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[id]-[contenthash:8].css'
    }),
    new OptimizeCSSAssentPlugin(), // 优化 CSS
    // 打包前删除 dist 旧文件夹
    new CleanWebpackPlugin()
  ]
})

module.exports = webpackProdConfig
