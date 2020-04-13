<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
@Component({})
export default class SidebarItemLink extends Vue {
  @Prop({ required: true }) private to!: string
  private isExternal = isExternal
}
</script>
<style lang='less' scoped >

</style>