const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const path = require('path');
const data = require('./static/data');
const lang = data.lang;

const devConfig = merge(baseConfig, {
  devtool: 'inline-source-map',
  devServer: {
    before(app) {
      app.get('/api/lang', function (req, res) {
        res.json({
          errno: 0,
          data: lang,
        })
      })
    },
    contentBase: path.resolve(__dirname + '/dist/'),
    inline: true,
    hot: true,
    host: "0.0.0.0",
    port: 9000
  },
  plugins: [
    // 显示热加载模块
    new webpack.NamedModulesPlugin(),
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
    // 不显示错误
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});

module.exports = devConfig;
