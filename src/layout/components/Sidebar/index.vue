<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- default-active 选择子项中路径作为高亮 -->
      <el-menu :default-active="activeMenu" :collapse="false" background-color="#1f2d3d" text-color="#bfcbd9" active-text-color="#409EFF" :unique-opened="true" :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :is-collapse="false" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'
import * as router from '@/router/index'
// $subMenuBg:#1f2d3d; $menuText:#bfcbd9; $menuActiveText:#409EFF;
@Component({
  components: {
    SidebarItem
  }
})
export default class Menu extends Vue {
  private routes = router.constantRoutes
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // 如果meta 中设置默认高亮
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    // 高亮当前路径的
    return path
  }
}
</script>
<style lang='less' scoped >
// @import url('~@/assets/style/variables.less');
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
<style lang="less">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>