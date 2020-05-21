<template>
  <div>
    <el-date-picker
      v-model="date"
      type="daterange"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Child from './child.vue'
@Component({})
export default class componentName extends Vue {
  private date = ''
  mounted() {
    let instance = new Vue(Child).$mount()
    this.$el.appendChild(instance.$el)
  }
}
</script>
<style lang='less' scoped >

</style>