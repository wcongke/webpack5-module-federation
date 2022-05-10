const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const webpackConfigProd = {
  // 生产环境
  mode: 'production',
  output: {
    filename: 'js/[name].[fullhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'auto',
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL': "'" + process.env.BASE_URL + "'",
    }),
    // 合并文件内css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
    }),
  ],
};

module.exports = webpackMerge.merge(webpackConfig, webpackConfigProd);
