<template>
  <div>
    这里是 line-chart
    <button @click="$router.push('/error/404')">跳转404</button>
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