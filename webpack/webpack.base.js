const path = require('path');

module.exports = {
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
              options: {
                modifyVars: {
                  '@nav-theme': 'light',
                  '@primary-color': 'red',                         // 全局主色
                  '@link-color': 'red',                            // 链接色
                  '@success-color': '#52c41a',                         // 成功色
                  '@warning-color': '#faad14',                         // 警告色
                  '@error-color': '#f5222d',                           // 错误色
                  '@font-size-base': '14px',                           // 主字号
                  '@heading-color': 'rgba(0, 0, 0, .85)',              // 标题色
                  '@text-color': 'rgba(0, 0, 0, .65)',                 // 主文本色
                  '@text-color-secondary': 'rgba(0, 0, 0, .45)',      // 次文本色
                  '@disabled-color': 'rgba(0, 0, 0, .25)',            // 失效色
                  '@border-radius-base': '4px',                        // 组件/浮层圆角
                  '@border-color-base': '#d9d9d9',                     // 边框色
                  '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',  // 浮层阴影
                },
                javascriptEnabled: true,
              }
            }
          ]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\_worker\.js$/,
        use: 'worker-loader',
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
