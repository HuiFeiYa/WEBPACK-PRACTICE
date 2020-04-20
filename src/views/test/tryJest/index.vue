<template>
  <div>
    <span class="count">{{ count }}</span>
    <el-button @click="increment">cccc</el-button>
    <el-button @click="increment"> c 1  </el-button>
    <el-button @click="increment"> 1111 </el-button>
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
      this.count++
    }
  }
}
</script>
