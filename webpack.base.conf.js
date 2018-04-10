const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const data = require('./static/data');
const lang = data.lang;


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
          options: {
            "presets": ["env"]
          }
        },
      },
      {
        test: /\.(git|png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
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
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[name]-[contenthash:8].css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: path.resolve(__dirname, './dist/static'),
      ignore: ['.*']
    }])
  ]
};

config.devServer = {
  before(app) {
    app.get('/api/lang', function (req, res) {
      res.json({
        errno: 0,
        data: lang,
      })
    })
  },
  contentBase: path.resolve(__dirname + '/src'),
  inline: true,
  hot: true,
  host: "0.0.0.0",
  port: 9000
}

module.exports = config;