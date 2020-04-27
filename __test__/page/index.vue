<template>
  <div>
    <!-- <el-input v-model="text"></el-input> -->
    <el-button @click="search">更换选择条件后搜索</el-button>
    <el-pagination
      class="el-pagination-box mt30"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="pageInfo.pageSizes"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    />
  </div>
</template>

<script>
  import page from '@/components/mixins/page'
  export default {
    mixins: [page],
    data() {
      return {
        text:''
      }
    },
    methods: {
      getData() {}
    }
  }
</script>

<style lang='less' scoped>

</style>
