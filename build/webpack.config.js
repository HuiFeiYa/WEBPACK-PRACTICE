const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('../public/config')[isDev ? 'dev' : 'build'];
const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const Happypack = require('happypack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
      //数组 放着所有的webpack插件
      new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html', //打包后的文件名
          minify: {
              removeAttributeQuotes: false, //是否删除属性的双引号
              collapseWhitespace: false, //是否折叠空白
          }
      }),
     
      new VueLoaderPlugin()
  ]
}
module.exports = smp.wrap(webpackConfig)