const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('../public/config')[isDev ? 'dev' : 'build'];
const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const  {CleanWebpackPlugin}  = require('clean-webpack-plugin')

const smp = new SpeedMeasurePlugin()
//webpack.config.js
const webpackConfig = {
  entry: {
      main:path.resolve(__dirname,'../src/main.js')
  },
  output: {
      path:path.resolve(__dirname, '../dist'),
      filename: 'bundle.[hash:6].js'
  },
  module: {
      rules: [
          {
              test: /\.js[x]?$/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ["@babel/preset-env"],
                      plugins: [
                          [
                              "@babel/plugin-transform-runtime",
                              {
                                  "corejs": 3
                              }
                          ]
                      ]
                  }
              },
              include: [path.resolve(__dirname,'src')]
          },
          {
            test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //10K
                        esModule: false,
                        name:'[name]_[hash:6].[ext]',
                        outputPath: 'assets'
                    }
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
      ]
  },
  plugins: [
      new VueLoaderPlugin(),
      new webpack.DllReferencePlugin({
          manifest: require(path.resolve(__dirname, '../dist','dll','manifest.json'))
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:['**/*','!dll/**','!dll']
      }),
  ]
}
const afterConfig = smp.wrap(webpackConfig)
afterConfig.plugins.unshift(//数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
)
module.exports = afterConfig