const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router']
  },
  mode: 'production',
  output: {
    filename: '[name].dll.[hash:6].js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      //name和library一致
      name: '[name]_dll',
      path: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
}
