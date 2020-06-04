const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config");

const webpackDevConfig = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            // support css modules
            resourceQuery: /module/,
            use: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: {
                    localIdentName: `[name]_[local]_[hash:base64:5]`,
                  },
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                },
              },
              "sass-loader",
            ],
          },
          {
            use: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                },
              },
              "sass-loader",
            ],
          },
        ],
      },
    ],
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    hot: true,
    hotOnly: true,
    overlay: {
      errors: true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../template.html"),
      filename: "index.html",
    }),
  ],
});

module.exports = webpackDevConfig;
