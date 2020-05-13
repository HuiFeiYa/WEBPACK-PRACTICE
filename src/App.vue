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
    // console.log(c)
    fetch('http://localhost:9000/react/font-error', {
        method:'post',
        body:JSON.stringify({name:'dd'}),
        headers: {
          "content-type":'application/json'
        }
      }).then(res=>res.json())
  },
  mounted() {
    this.$refs.app.addEventListener('click',()=>{
      console.log('111111', app)
    })
  }
}
</script>
