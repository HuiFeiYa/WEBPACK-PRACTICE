<template>
  <div class="App" ref="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    this.$refs.app.addEventListener('click',()=>{
      console.log('111111', app)
    })
  }
}
</script>
