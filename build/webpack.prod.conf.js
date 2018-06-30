const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.conf')
const path = require('path')

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(styl|stylus)$/,
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
    runtimeChunk: {
      name: 'mainfest'
    },
    // 分割块
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(styl|stylus|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // html 插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
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
    // 分离css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[id]-[contenthash:8].css'
    }),
    // css 压缩
    new OptimizeCSSAssentPlugin()
  ]
})
