import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less'
import './a'
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
