<template>
  <div class="app-wrapper">
    <Navbar />
    <App-main />
    <h1>这里是底部</h1>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AppMain, Navbar } from './components'
@Component({
  components: {
    AppMain,
    Navbar
  }
})
export default class componentName extends Vue {
}
</script>
<style lang='less' scoped >

</style>