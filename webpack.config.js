const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const data = require('./resource/data');
const lang = data.lang;

const config = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
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
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
  contentBase: __dirname + '/dist/',
  inline: true,
  hot: true,
  host: "0.0.0.0",
  port: 9000
}

module.exports = config;