const path = require("path");
const merge = require("webpack-merge");
const OptimizeCSSAssentPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config");

const webpackProdConfig = merge(baseConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].thunk.[contenthash:8].js",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            // support css modules
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: {
                    localIdentName: `[name]_[local]_[hash:base64:5]`,
                  },
                },
              },
              "postcss-loader",
              "sass-loader",
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                },
              },
              "postcss-loader",
              "sass-loader",
            ],
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../template.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].thunk.[contenthash:8].css",
    }),
    new OptimizeCSSAssentPlugin(),
    new CleanWebpackPlugin(),
  ],
});

module.exports = webpackProdConfig;
