const HtmlWebpackPlugin = require('html-webpack-plugin');
const  {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const apiMocker = require('mocker-api')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const Happypack = require('happypack')
const smp = new SpeedMeasurePlugin()
//webpack.config.js
const webpackConfig = {
  mode: 'development',
  output: {
      path:path.resolve(__dirname, 'dist'),
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
            test: /\.(le|c)ss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: isDev,
                    reloadAll:true
                }
            }, 'css-loader', {
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
        }
      ]
  },
  devServer: {
    before(app) {
        apiMocker(app,path.resolve('./mock/mocker.js'))
    },
    port: '3000', //默认是8080
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
      //数组 放着所有的webpack插件
      new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html', //打包后的文件名
          minify: {
              removeAttributeQuotes: false, //是否删除属性的双引号
              collapseWhitespace: false, //是否折叠空白
          },
          config: config.template
          // hash: true //是否加上hash，默认是 false
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:['**/*','!ccc/**']
      }),
      new MiniCssExtractPlugin({
          filename: 'css/[name].css'
      }),
      new OptimizeCssPlugin()
  ]
}
module.exports = smp.wrap(webpackConfig)