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
            target: 'http://localhost:9000',
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
          'process.env.baseUrl':'https://test.wxb.com.cn'
      })
  ]
})
