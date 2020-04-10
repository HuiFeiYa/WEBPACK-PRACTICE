<template>
  <section class="app-main">
    <!-- 只过渡内容部分 过渡属性 translateX, opacity -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'AppMain'
})
export default class componentName extends Vue {
}
</script>
<style lang='less' scoped >

</style>