<template>
  <div id="header-search" :class="{'show': show}" class="header-search">
    <svg-icon icon-class="search3" name="search" @click.stop="click" />
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option remote placeholder="Search" class="header-search-select" @change="change">
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.meta.title.join(' > ')" />
    </el-select>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
@Component({})
export default class componentName extends Vue {
  private show = false
  private search = ''
  private options: RouteConfig[] = []
  private click() {
    this.show = !this.show
  }
  private querySearch() {}
  private change() {}
}
</script>
<style lang='less' scoped >
.header-search {
  display: inline-block;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    // 向右过渡显示展示input框
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
    }
  }
}
</style>