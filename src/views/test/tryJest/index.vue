<template>
  <div>
    <span class="count">{{ count }}</span>
    <Button @click="increment">aaa</Button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  components: {
    Button
  },
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
