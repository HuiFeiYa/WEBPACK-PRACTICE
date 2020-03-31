<template>
  <div>这里是主页</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class componentName extends Vue {
  created() {
    this.init()
  }
  private init() {
    console.log('init')
  }
}
</script>
<style lang='less' scoped >

</style>
