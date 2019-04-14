const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    modules: ['node_modules', 'src', 'routes', 'assets', 'components'],
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.less|css$/,
        use:
          [
            {
              loader: 'style-loader' // creates style nodes from JS strings
            },
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     config: {
            //       path: './postcss.config.js',
            //     },
            //   }
            // },
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true }
            }
          ]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: '[name].[ext]',
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
};
