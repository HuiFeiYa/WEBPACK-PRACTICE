<template>
  <div>
    <div>这里是主页</div>
    <Avatar width="sdd" :value="value" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '../components/AvatarUpload/index.vue'
import { getArticles } from '../api/layout'
@Component({
  components: {
    Avatar
  }
})
export default class Login extends Vue {
  data() {
    return {
      list: [{}, {}],
      value: {
        name: 'dd'
      }
    }
  }
  created() {
    this.init()
  }
  private init() {
    console.log('init')
    getArticles(1)
  }
  private login() {
    // ('/dalaran/login')
  }
}
</script>
<style lang='less' scoped >

</style>
