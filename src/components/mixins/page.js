// 分页相关固定代码
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 2,
        pageSizes: [10, 100, 200, 500],
        pageSize: 10,
        total: 100
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log('size-change')
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log('current-change', val)
      this.pageInfo.currentPage = val
      this.getData()
    },
    search(value) {
      console.log('click button',value.target.value)
      this.pageInfo.currentPage = 1
      this.getData()
    }
  }
}
