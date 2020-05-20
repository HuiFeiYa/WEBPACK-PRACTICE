<template>
  <div>
    <div>这里是主页</div>
    <el-form ref="login" :model="form" label-width="80px">
      <el-form-item label="登陆名">
        <el-input v-model="form.userName" class="user" @blur="onBlur" @input="onInput" @focus="onFocus" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" class="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登 陆</el-button>
      </el-form-item>
    </el-form>
    <!-- <input class="compare" type="text" @focus="onFocus" @input="onInput"> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '../components/AvatarUpload/index.vue'
import { login } from '../api/login'
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'

@Component({
  components: {
    Avatar
  }
})
export default class Login extends Vue {
  private form = {
    userName: '1111',
    password: ''
  }
  private routes:RouteConfig[] = [{
    path: '/dynamical',
    component: () => import(/* webpackChunkName: "login" */'./Dynamical.vue')
  }]
  mounted() {
    this.login()
  }
  private login() {
  }
  private onDynamicalClick() {
    this.$router.addRoutes(this.routes)
    console.log('动态添加 routes')
  }
  onBlur() {
    console.log('blur')
  }
  onInput() {
    console.log('input111111')
  }
  onFocus() {
    console.log('onFocus')
  }
}
</script>
<style lang='less' scoped >

</style>
