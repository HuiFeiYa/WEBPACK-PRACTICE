import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less'
Vue.component('svg-icon', SvgIcon)
Vue.use(ElementUI)
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  const componentRouteInfo = vm.$route
  // 组件路径，路由名称
  const { fullPath,name } = componentRouteInfo

  console.log('----', err, info)
  fetch('http://localhost:9000/react/font-error',{
    method:'post',
    body:JSON.stringify({
      fullPath,
      routeName:name,
      errType:err.name,
      errInfo:info
    })
  })
  throw new Error('这里报错来')
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
