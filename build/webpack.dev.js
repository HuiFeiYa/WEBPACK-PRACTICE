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
      {
        test: /\.(le|c)ss$/,
        use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [
                        require('autoprefixer')({
                            "overrideBrowserslist": [
                                ">0.25%",
                                "not dead"
                            ]
                        })
                    ]
                }
            }
        }, 'less-loader'],
        exclude: /node_modules/
    },
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
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})
