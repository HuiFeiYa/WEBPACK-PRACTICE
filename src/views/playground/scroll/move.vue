<template>
  <div class="container">
    <span class="line1" :style="{height:line1.top + 'px',left:line1.left + 'px'}">
      top: {{ line1.top | saveTwoDecimal }}
      left: {{ line1.left | saveTwoDecimal }}
    </span>
    <span class="line2"></span>
    <div ref="move" class="move" draggable @dragstart="onStart" @dragenter="onDragenter" @dragover.prevent="onDragover" @dragend="onDragend" @drop="onMoveDrop"></div>
    <!-- 只有 drapover 事件 阻止默认事件才会在 被释放当前区域时触发 drop 事件-->
    <!-- <div class="move1" draggable @dragover.prevent="onDragover" @drop="onDrop"></div> -->
  </div>
</template>
<script lang='ts'>
interface Style {
  left:string
}
import { Component, Vue } from 'vue-property-decorator'
@Component({
  filters:{
    saveTwoDecimal(number:number) {
      return number.toFixed(2)
    }
  }
})
export default class MoveScroll extends Vue {
  // 记录鼠标的起始位置，移动后减去起始位置
  private startX!:number
  private startY!:number
  private isShow:boolean=false
  private line1:{
    top:number,
    left:number
  } = {
    top:0,
    left:0
  }
  $refs!:{
    move:HTMLElement
  }
  moveWidth() {
    return this.$refs.move.clientWidth
  }
  moveHeight() {
    return this.$refs.move.clientHeight
  }
  // 获取该对象下的 top , left
  position() {
    return this.$refs.move.getBoundingClientRect()
  }
  // get line1Top() {
  //   return this.position.top
  // }
  // get line1Left() {
  //   return this.position.left + this.moveWidth / 2
  // }
  line1Top() {
    return this.position().top - 50
  }
  line1Left() {
    return this.position().left - 210 + this.moveWidth() / 2
  }
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 1000)
  }
  onStart(event:any) {
    // x,y 是相对于浏览器窗口的位置
    const { x,y,offsetX,offsetY,clientX,clientY,layerX,layerY } = event
    this.startX = x
    this.startY = y
    console.log('s--',clientY,y,offsetY)
  }
  onDragenter(value:Event) {
    console.log('enter',value)
  }
  onDragend(value:DragEvent) {
    const { x,y,offsetX,offsetY,clientX,clientY } = value
    // style 是一个对象和 this.$refs.move 指向同一个指针
    const style = this.$refs.move.style
    // y - this.startY 计算出鼠标 y轴移动的差 (x轴原理相同 )
    // 每次移动的时候需要带上累计的 top 值，如果 style 中不存在 top 则设置为 0
    style.top = (style.top ? parseFloat(style.top) : 0) + y - this.startY + 'px'
    style.left = (style.left ? parseFloat(style.left) : 0) + x - this.startX + 'px'
    this.line1Move()
  }
  line1Move() {
    console.log('---',this.position())
    this.line1 = {
      top: this.line1Top(),
      left: this.line1Left()
    }
  }
  onDragover(value:any) {
    // console.log('over',value)
  }
  onDrop(value:any) {
    console.log('drop',value)
  }
  onMoveDrop(value:any) {
    // console.log('drop-----',value)
  }
}
</script>
<style lang='less' scoped >
.container{
  position: relative;
}
.move{
  width:100px;
  height: 100px;
  background: #000;
  position: absolute;
  top:10px;
  left: 10px;
}
.move1{
  width:100px;
  height: 100px;
  background: #ff6;
}
.line1{
  width:2px;
  position: absolute;
  top:0;
  background: red;
  z-index: 999;
}
</style>