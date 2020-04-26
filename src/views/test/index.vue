<template>
  <div>自动化测试

    <MButton />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import MButton from './tryJest/index.vue'
@Component({
  components: {
    MButton
  }
})
export default class componentName extends Vue {
}
</script>
<style lang='less' scoped >

</style>