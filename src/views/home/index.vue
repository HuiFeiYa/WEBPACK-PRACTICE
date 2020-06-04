<template>
  <div class="login-container">
    <!-- <svg-icon icon-class="search3" />
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-20gl-podium" />
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-tianwentaiSVG" />
    </svg> -->
    <github-corner style="position: absolute; top: 0; border: 0; right: 0;" />
    <!-- <img style="width:300px" src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" class="emptyGif"> -->

  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { isValidUsername } from '@/utils/validate'
import GithubCorner from '@/components/GithubCorner/index.vue'
@Component({
  components: {
    GithubCorner
  }
})
export default class componentName extends Vue {
  private search = ''
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
.login-container{
  background-color:#e3e3e3;
  min-height: 100%;
  position: relative;
}
</style>