<template>
  <div>
    <button @click="onButtonClick">触发</button>
    <div>{{ text }}</div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class componentName extends Vue {
  @Prop({ type: String, required: true }) private text!:string
  private onButtonClick() {
    this.$emit('custom')
  }
}
</script>
<style lang='less' scoped >

</style>