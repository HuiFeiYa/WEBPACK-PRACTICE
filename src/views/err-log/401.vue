<template>
  <div class="components-container" >
    <!-- <img src="@/assets/images/error/401.gif" alt=""> -->
    <button @click="onButtonClick">按钮</button>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { error } from '@/api/errlog'
import request from '@/utils/request'
interface ListItem{
  name:string,
  age:number
}
@Component({})

export default class Page401 extends Vue {
  created() {
    // console.log(c)
    // request('/aaa/b')
    // error()
  }
  onButtonClick() {
  }
}
</script>
<style lang='less' scoped >

</style>