const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.js');
const host = 'localhost';
const port = '3000';

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'http://' + host + ':' + port + '/assets/'
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
