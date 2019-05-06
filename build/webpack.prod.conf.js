const merge = require('webpack-merge')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackProdConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    // 使用 contenthash 修改后，请求新的内容
    chunkFilename: 'js/[id].thunk.[contenthash:8].js'
  },
  // 上线代码也可查错
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssentPlugin()] // 压缩 CSS
  },
  plugins: [
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].thunk.[contenthash:8].css'
    }),
    // new OptimizeCSSAssentPlugin(), // 压缩 CSS 方法二
    // 打包前删除 dist 旧文件夹
    new CleanWebpackPlugin()
    // 模块分析插件
    // new BundleAnalyzerPlugin()
  ]
})

module.exports = webpackProdConfig
