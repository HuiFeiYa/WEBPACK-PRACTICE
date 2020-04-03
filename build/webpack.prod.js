const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// 拆分css 比如将内联的css拆分出来，这样改动 js后也不会导致 css 文件的缓存失败
// 优化 css书写 优化了你的代码 margin: 10px 20px 10px 20px; =>margin:10px 20px;。

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const  {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const path = require('path')
module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  module: {
    rules: [
      
    ]
  },
  plugins: [
    new OptimizeCssPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dist','dll','manifest.json'))
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*','!dll/**','!dll']
    }),
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new webpack.DefinePlugin({
      'process.env.baseUrl':'http://nodefly.club'
  })
  ],
  // 每次构建都是基于上次构建的基础上进行的
  recordsPath: path.join(__dirname, './dist/records.json')
})