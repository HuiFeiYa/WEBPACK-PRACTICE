<template>
  <div class="App" ref="app">
    <router-view />
  </div>
</template>

<script>
import { error } from '@/utils/error'
console.log('error', error)
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    // error({
    //   errorType:'create hook'
    // })
    this.insert()
  },
  methods:{
    insert() {
      let hm = document.createElement('script')
      hm.src = 'https://static.wxb.com.cn/frontEnd/files/js/webfunny-almighty.js?time=2020'
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }
}
</script>
