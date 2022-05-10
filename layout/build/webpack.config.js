const path = require('path');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const rules = require('./webpack.rules.config');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/main.ts'),
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    // 模块联邦
    new ModuleFederationPlugin({
      name: 'layout',
      filename: 'remote-entry.js',
      remotes: {
        home: 'home@http://localhost:3002/remote-entry.js',
      },
      exposes: {}
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['main']
    }),
    // 静态资源输出
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: '../static',
        },
      ],
    }),
  ],
  // 优化
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        vendor: {
          // 指定是node_modules下的第三方包
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          // 打包后的文件名，任意命名
          name: 'vendor',
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        // 抽离自己写的公共代码，common这个名字可以随意起
        utils: {
          chunks: 'initial',
          // 任意命名
          name: 'common',
          // 只要超出0字节就生成一个新包
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [...rules],
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
    allowCollectingMemory: true,
  },
  experiments: {
    topLevelAwait: true,
  }
};
