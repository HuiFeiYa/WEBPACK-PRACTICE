<template>
  <div @click="onLogCurrentScrollClick">
    <div class="father" ref="father">
      <div class="scroll" ref="scroll"></div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
// import { VNode } from 'vue/types/index'
@Component({})
export default class componentName extends Vue {
  private wrapper!:Element
  $refs!: {
     scroll:HTMLElement,
     father:HTMLElement
  }
  mounted() {
    this.wrapper = document.getElementsByClassName('app-wrapper')[0]
    // this.content = this.$refs.scroll
  }
  onLogCurrentScrollClick() {
    console.log('*'.repeat(10),this.$refs.father.scrollTop)
    console.log('-'.repeat(10),this.$refs.scroll.scrollHeight)
    console.log('-'.repeat(10),this.$refs.scroll.scrollTop)
    console.log('-'.repeat(10),this.$refs.scroll.getBoundingClientRect())
  }
}
</script>
<style lang='less' scoped >
.scroll{
  height: 1000px;
  background-color: #f66;
}
.father{
  width:400px;
  height: 400px;
  overflow-y:auto;
}
</style>