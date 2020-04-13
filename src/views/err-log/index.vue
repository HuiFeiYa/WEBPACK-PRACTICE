<template>
  <div class="components-container">
    404 页面
    <button @click="$router.go(-1)">返回</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class componentName extends Vue {
}
</script>
<style lang='less' scoped >

</style>