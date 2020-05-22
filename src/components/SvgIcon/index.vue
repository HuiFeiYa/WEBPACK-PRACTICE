<template>
  <svg :class="svgClass" class="icon" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'svgIcon'
})
export default class componentName extends Vue {
  @Prop({ required: true }) private iconClass!:string
  @Prop({ default: '' }) private className!:string
  get iconName() {
    return `#icon-${this.iconClass}`
  }
  get svgClass() {
    return this.className ? 'svg-icon' : ('svg-icon' + this.className)
  }
}
</script>
<style lang='less'>
.icon {
  width: 20px; height: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  user-select: none;
}

// 使用方法在 index.html 中引入在线js <script src="//at.alicdn.com/t/font_1212269_rxke3jpoo9r.js"></script>
// 使用格式
/*
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconduigouxuanzhong" />
  </svg>
*/

// 如果使用 symbol 图片未生效，那么是未生成最新的js代码
</style>