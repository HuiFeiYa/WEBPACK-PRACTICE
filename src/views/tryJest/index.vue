<template>
  <div>
    1
  </div>
</template>

<script>
import a from '@/utils/a.js'
import { isValidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      search: ''
    }
  },
  created() {
    console.log('isValidUsername', isValidUsername)
  }
}
</script>
