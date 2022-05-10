const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
  {
    test: /\.(m?js|m?ts|m?tsx|m?tss)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-top-level-await'],
        presets: ['@babel/preset-typescript', '@babel/preset-env']
      }
    }
  },
  {
    test: /\.(css|scss|sass)$/,
    // 区别开发环境和生成环境
    use:
      process.env.NODE_ENV === 'development'
        ? ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
  },
  {
    test: /\.xml$/i,
    use: ['xml-loader'],
  },
  {
    test: /\.html$/,
    // html中的img标签
    use: {
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    },
  },
];

module.exports = rules;
