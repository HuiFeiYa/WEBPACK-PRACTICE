import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import SvgIcon from '@/components/SvgIcon'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less'
Vue.component('svg-icon', SvgIcon)
Vue.use(ElementUI)
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log('----', err.name, info)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
