const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

const webpackBaseConfig = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[id].thunk.[hash:8].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/
      },
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: true
          }
        }
      },
      {
        test: /\.(git|png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'media/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  optimization: {
    // Tree shaking
    // 还需要在 package.json 配置 "sideEffects": ["*.css"] 字段，忽略 css 文件
    // 而设置值为 false 则没有忽略文件
    usedExports: true,
    // 提取 manifest
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      // all 其他都是默认的选项
      chunks: 'all'
      // minSize: 30000,
      // 至少有一个模块用到了包才会分离
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     优先级，数字越大优先级越高
      //     priority: -10
      //     包文件名
      //     filename: 'js/vendors.js'
      //   },
      //   default: {
      //     priority: -20,
      //     reuseExistingChunk: true
      //     filename: 'js/common.js'
      //   }
      // }
    }
  },
  plugins: [
    // 拷贝静态文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: path.resolve(__dirname, '../dist/static'),
        ignore: ['.*']
      }
    ]),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = webpackBaseConfig
