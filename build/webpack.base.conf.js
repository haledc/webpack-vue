const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

const config = {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name]-[hash:8].js'
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
            preserveWhitepace: true
          }
        }
      },
      {
        test: /\.(git|png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name]-[hash:8].[ext]'
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
    // 复制静态文件
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../src/static'),
      to: path.join(__dirname, '../dist/static'),
      ignore: ['.*']
    }]),
    // 清理之前的打包文件
    new CleanWebpackPlugin(
      [path.join(__dirname, '../dist/')],
      {
        root: path.join(__dirname, '../')
      }
    ),
    new VueLoaderPlugin()
  ]
}

module.exports = config
