<template>
  <div>
    <div>这里是主页</div>
    <button @click="$router.push('/login')">login</button>
    <button @click="$router.go(-1)">back</button>
    <button @click="onDynamicalClick">dynamical</button>
    <button @click="$router.push('/dynamical')">go dynamical</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '../components/AvatarUpload/index.vue'
// import { getArticles } from '../api/layout'
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'
@Component({
  components: {
    Avatar
  }
})
export default class Login extends Vue {
  private routes:RouteConfig[] = [{
    path: '/dynamical',
    component: () => import(/* webpackChunkName: "login" */'./Dynamical.vue')
  }]
  created() {
    this.init()
  }
  private init() {
  }
  private login() {
    // ('/dalaran/login')
  }
  private onDynamicalClick() {
    this.$router.addRoutes(this.routes)
    console.log('动态添加 routes')
  }
}
</script>
<style lang='less' scoped >

</style>
