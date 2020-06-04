const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const webpackBaseConfig = {
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].thunk.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: /src/,
      },
      {
        test: /\.(vue|js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(git|png|jpe?g|svg)$/i,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "[name].[hash:8].[ext]",
          outputPath: "images/",
          esModule: false,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "[name].[hash:8].[ext]",
          outputPath: "fonts/",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "[name].[hash:8].[ext]",
          outputPath: "media/",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/static"),
        to: path.resolve(__dirname, "../dist/static"),
        ignore: [".*"],
      },
    ]),
    new VueLoaderPlugin(),
  ],
};

module.exports = webpackBaseConfig;
