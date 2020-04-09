const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const apiMocker = require('mocker-api')
const path = require('path')
module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
    ]
  },
  devServer: {
    before(app) {
        apiMocker(app,path.resolve('./mock/mocker.js'))
    },
    quiet: false, //默认不启用,
    proxy: {
        '/api': {
            target: 'http://localhost:1027',
            pathRewrite: {
                '/api': ''
            }
        }
    },
    // 是否在浏览器中显示错误
    overlay: {
        warnings: false,
        errors: true
      },
  },
  plugins:[
      new webpack.DefinePlugin({
          // 值必须使用 JSON.stringify 否则引起一些奇怪的报错
          // https://webpack.docschina.org/plugins/define-plugin/
          'process.env.VUE_APP_BASE_API':JSON.stringify('https://localhost:8081/api')
      })
  ]
})
