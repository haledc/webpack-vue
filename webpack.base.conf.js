const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'static/js/[name]-[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 version']
                })
              ]
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(git|png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'mainfest'
    },
    // 公共文件分离
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
          test: /\.(styl|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // html插件
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[name]-[contenthash:8].css'
    }),
    // 复制静态文件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: path.resolve(__dirname, './dist/static'),
      ignore: ['.*']
    }]),
    // 清理插件
    new CleanWebpackPlugin(
        [path.join(__dirname, './dist/')],
        {
          root: path.join(__dirname, './')
        }
    )
  ]
};

module.exports = config;