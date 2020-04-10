<template>
  <div>
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container" />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
@Component({
  name: 'Navbar',
  components: {
    Breadcrumb
  }
})
export default class componentName extends Vue {
}
</script>
<style lang='less' scoped >

</style>