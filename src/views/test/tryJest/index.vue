<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="increment">Increment</button>
    <button @click="increment">c</button>
  </div>
</template>

<script>
import a from '@/utils/a.js'
import { isValidUsername } from '@/utils/validate'
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
