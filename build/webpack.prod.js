const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const  {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: false,
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*','!ccc/**']
    }),
    new OptimizeCssPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
  ]
})