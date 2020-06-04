const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath:'/',
  configureWebpack:() => {
    return {
      entry:'./src/main.ts',
      devtool: 'source-map'
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@',resolve('src'))
    // 为了补删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  }
}