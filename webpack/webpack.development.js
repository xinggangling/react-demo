
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.js');
const host = '172.16.0.122';
const port = '3000';

module.exports = merge(baseWebpackConfig, {
  entry: [
    "@babel/polyfill",
    './src/index.js',
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'http://' + host + ':' + port + '/assets/',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    // proxy: {},
    publicPath: 'http://' + host + ':' + port + '/assets/',
    contentBase: 'src/www',
    host: host,
    port: port,
    compress: false,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
      assets: true,
      chunks: false,
      colors: true,
      version: false,
      hash: true,
      timings: true,
      chunkModules: false,
      children: false,
      modules: false
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10240,
      //       name: '[name].[ext]',
      //     }
      //   }]
      // },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets/model'),
        to: 'model',
        publicPath: 'http://' + host + ':' + port + '/assets/',
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets/js/'),
        to: 'js',
        publicPath: 'http://' + host + ':' + port + '/assets/',
      }
    ]),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      filename: 'index.html',
      template: 'src/www/index.html',
      inject: true
    }),
  ]
});
