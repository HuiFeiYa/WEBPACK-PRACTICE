<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <!-- 末尾基本的域名地址是只不可点击 -->
        <span v-if="index === breadcrumbs.length -1 ">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang='ts'>
// path-to-regexp 是通过 export 暴露出来的，使用 * as 将所有方法都放在一个模块上
import * as pathToRegexp from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { RouteRecord, Route } from 'vue-router'
@Component({
  name: 'Breadcrumb'
})
export default class componentName extends Vue {
  private breadcrumbs: RouteRecord[] = []
  @Watch('$route')
  // 和 watch 函数使用相同
  private onRouteChange(route:Route) {
    // 更新面包屑
    this.getBreadcrumb()
  }
  created() {
    this.getBreadcrumb()
  }
  private getBreadcrumb() {
    // 当前 route 能匹配到所有到路由一级 和 二级路由规则的路由项
    const matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
    // 根据当前的路由来调整面包屑内容
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }
  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  }
  // 非末尾的 path 可以点击跳转
  private handleLink(item:any) {
    const { redirect, path } = item
    // 如果之前的 path 定义了 redirect 直接跳转该链接
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(this.pathCompile(path))
  }
}
</script>
<style lang='less' scoped >
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>