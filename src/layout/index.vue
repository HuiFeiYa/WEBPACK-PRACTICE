<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />

      </div>
      <App-main />
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AppMain, Navbar } from './components'
import Sidebar from './components/Sidebar/index.vue'
@Component({
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
})
export default class Layout extends Vue {
  private showTagsView = true
  private fixedHeader = true
}
</script>

<style lang="less" scoped>
.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 210px;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: 210px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px)
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: 210px !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-210px, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
