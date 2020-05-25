<template>
  <div class="components-container">
    <!-- <img src="@/assets/images/error/401.gif" alt=""> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { error } from '@/api/errlog'
interface ListItem{
  name:string,
  age:number
}
@Component({})

export default class componentName extends Vue {
  private list:ListItem[] =[]
  created() {
    this.list.push({ name:'111',age:1 })
  }
}
</script>
<style lang='less' scoped >

</style>