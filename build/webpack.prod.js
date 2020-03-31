const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
    new OptimizeCssPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new BundleAnalyzerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dist','dll','manifest.json'))
    }),
  ]
})