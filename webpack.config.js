const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path')
//webpack.config.js
module.exports = {
  mode: 'development',
  output: {
      path:path.resolve(__dirname, 'dist'),
      filename: 'bundle.[hash:6].js'
  },
  module: {
      rules: [
          {
              test: /\.jsx?$/,
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
              exclude: /node_modules/
          },
          {
            test: /\.(le|c)ss$/,
            use: ['style-loader', 'css-loader', {
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
    port: '3000', //默认是8080
    quiet: false, //默认不启用
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
      })
  ]
}
