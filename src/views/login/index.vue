<template>
  <div class="login-container">
    <svg-icon icon-class="search3" />
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-20gl-podium" />
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-tianwentaiSVG" />
    </svg>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left">
      <el-form-item>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { isValidUsername } from '@/utils/validate'
import { getArticles } from '@/api/layout'
@Component({})
export default class componentName extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  private loginForm = {
    username: 'admin',
    password: '11111'
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
  created() {
  }
  getLocation() {
    if (window.navigator.geolocation) {
      console.log('------')
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log('a------')
        const { latitude, longitude } = position.coords
        const str = '纬度:' + latitude + '经度' + longitude
        alert(str)
      }, (err) => {
        alert(err)
        console.log('err', err)
      }, {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0
      })
    } else {
      alert('Your browser does not natively support geolocation.');
    }
  }
}
</script>
<style lang='less' scoped >

</style>