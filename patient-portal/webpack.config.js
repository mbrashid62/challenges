const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('babel-core/register');
require('babel-polyfill');

module.exports = {
  entry: ['babel-polyfill', './client/main.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './client/index.html',
      path: path.resolve(__dirname, 'public'),
      filename: 'index.html',
      watch: true,
    }),
    new ExtractTextPlugin({ filename: './stylesheets/style.css' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
          },
        }],
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }],
        }),
      },
    ],
  },
};
