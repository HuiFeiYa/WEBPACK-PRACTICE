<template>
  <div>
    <span class="count">{{ count }}</span>
    <el-button @click="increment">aaa</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      count: 0
    }
  },
  created() {
    // console.log('isValidUsername', isValidUsername)
  },
  methods: {
    increment() {
      console.log('increment')
      this.count++
    }
  }
}
</script>
