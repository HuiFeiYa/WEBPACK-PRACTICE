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
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>