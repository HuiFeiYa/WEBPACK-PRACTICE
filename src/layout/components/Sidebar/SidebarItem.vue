<template>
  <div>
    <!-- 没有子项的显示方式 -->
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)" :class="{'submenu-title-noDropdown': isFirstLevel}">
          <svg-icon v-if="theOnlyOneChild.meta.icon" :icon-class="theOnlyOneChild.meta.icon" />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{ theOnlyOneChild.meta.title }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else popper-append-to-body :index="resolvePath(item.path)">
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.title" :icon-class="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />
      </template>
    </el-submenu>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import SidebarItemLink from './SidebarItemLink.vue'
import { RouteConfig } from 'vue-router'
// 判断引入的路径是为外部路径
import { isExternal } from '@/utils/validate'
import path from 'path'
@Component({
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  }
})
export default class SidebarItem extends Vue {
  // 当前 menu-item 项对应的路由
  @Prop({ required: true }) private item!: RouteConfig
  @Prop({ default: false }) private isCollapse!: boolean
  @Prop({ default: true }) private isFirstLevel!: boolean
  @Prop({ default: '' }) private basePath!: string
  // meta 中是否设置了 alwaysShow 属性，如果设置了一直展示改子项
  get alwaysShowRootMenu() {
    return this.item.meta && this.item.meta.alwaysShow
  }
  // 判断当前 menu-item 有几个子项
  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(item => {
        return !item.meta || !item.meta.hidden
      })
      return showingChildren.length
    }
    return 0
  }
  // 如果 children 只有 1 个 或者没有则返回响应的组件
  get theOnlyOneChild() {
    // children 大于 1 则返回null
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      // 返回第一个 child 并且该child 需要有 meta 属性并且未设置为 hidden
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    return { ...this.item, path: '' }
  }
  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }
}
</script>
<style lang='less' scoped >
.el-submenu.is-active > .el-submenu__title {
  color: #f4f4f5 !important;
}

.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: 210px !important;
    background-color: #1f2d3d !important;

    &:hover {
      background-color: #001528 !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>