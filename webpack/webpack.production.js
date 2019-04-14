const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StringReplacePlugin = require("string-replace-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const apiHost = config.apiHost || '';
// const apiPort = config.apiPort || '';
// const protocol = config.protocol || '';

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().length == 2 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1).toString();
const day = (now.getDate() + 1).toString().length == 2 ? now.getDate() : '0' + now.getDate();
const hour = now.getHours().toString().length == 2 ? now.getHours() : '0' + now.getHours().toString();
const minutes = now.getMinutes().toString().length == 2 ? now.getMinutes() : '0' + now.getMinutes().toString();
const nowString = year + month + day + hour + minutes;

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
	output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js' + '?rt=' + nowString,
    publicPath: '/'
  },
  module: {
    // rules: [{
    //   test: /config\/index.js$/,
    //   include: [configPath],
    //   loader: StringReplacePlugin.replace({
    //     replacements: [{
    //       pattern: /development/ig,
    //       replacement: () => {
    //         return 'production';
    //       }
    //     }]
    //   })
    // }]
  },
  // devtool: '#source-map',
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./vendor-manifest.json')
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      filename: 'index.html',
      template: 'src/www/index_prd.html',
      // apiHost: apiHost,
      // apiPort: apiPort,
      // protocol: protocol
    }),
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ['vendor.dll.js'],
    //   files: ['index.html'],
    //   append: false,
    //   hash: true
    // }),
    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.join(__dirname, '../docker/build'),
    //   outputDir: path.join(__dirname, '../docker/prerendered'),
    //   routes: [ '/' ],
    //   renderer: new Renderer({
    //     // Optional - The name of the property to add to the window object with the contents of `inject`.
    //     injectProperty: '__PRERENDER_INJECTED',
    //     // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
    //     inject: {
    //       foo: 'bar'
    //     },
    //     minify: {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       collapseInlineTagWhitespace: true,
    //       removeAttributeQuotes: true,
    //       minifyCSS: true,
    //       minifyJS: true
    //       // more options:
    //       // https://github.com/kangax/html-minifier#options-quick-reference
    //     },
    //     headless: false // Display the browser window when rendering. Useful for debugging.
    //   })
    // }),

    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 50000 // Minimum number of characters (25kb)
    // }),

    /*
      @desc: 编译之后，您可能会注意到某些块太小 - 创建更大的HTTP开销，那么您可以处理像这样；
      @reference: https://webpack.js.org/plugins/limit-chunk-count-plugin/
    */
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 30, // Must be greater than or equal to one
      minChunkSize: 50000
    }),

    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段;
    new webpack.NoEmitOnErrorsPlugin(),
    /*
      @desc: 提升代码在浏览器中的执行速度: 作用域提升(scope hoisting)；
      @reference: https://doc.webpack-china.org/plugins/module-concatenation-plugin/
    */
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})