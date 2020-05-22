<template>
  <div class="father" ref="father" @click="onLogCurrentScrollClick">
    <div class="scroll" ref="scroll"></div>
    <div ref="bottom" class="bottom"></div>
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
     father:HTMLElement,
     bottom:HTMLElement
  }
  mounted() {
    this.wrapper = document.getElementsByClassName('app-wrapper')[0]
    // this.content = this.$refs.scroll
    this.$refs.father.addEventListener('scroll',(event) => {
      console.log('-'.repeat(10),JSON.stringify(this.$refs.bottom.getBoundingClientRect()), document.body.offsetHeight)
      console.log('s'.repeat(10),this.$refs.father.scrollTop)
    })
  }
  onLogCurrentScrollClick() {
    console.log('#'.repeat(10),document.body.scrollTop)
    console.log('*'.repeat(10),this.$refs.father.scrollTop)
    console.log('-'.repeat(10),this.$refs.scroll.scrollHeight)
    console.log('c'.repeat(10),this.$refs.father.offsetHeight)
    console.log('c'.repeat(10),this.$refs.father.clientHeight)
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
  height: 100%;
  overflow-y:auto;
}
.bottom{
  height: 33px;
  width:100%;
  background-color: #000;
}
</style>