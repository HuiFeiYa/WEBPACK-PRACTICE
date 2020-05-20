<template>
  <div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class componentName extends Vue {
  private date = ''
}
</script>
<style lang='less' scoped >

</style>