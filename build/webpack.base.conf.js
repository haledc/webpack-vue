const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const webpackBaseConfig = {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name]-[hash:8].js',
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
          name: '[name]-[hash:8].[ext]',
          outputPath: 'static/fonts/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/fonts/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/media/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: [
    // 拷贝静态文件
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/static'),
        to: path.join(__dirname, '../dist/static'),
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = webpackBaseConfig
