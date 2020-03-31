<template>
  <div>
    这里是 avatar
    {{ value }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'AvatarUpload'
})
export default class extends Vue {
  // You can add more Prop, see: https://github.com/dai-siki/vue-image-crop-upload#usage
  @Prop({ required: true }) private value!: boolean
  @Prop({ default: 300, required: true }) private width!: number
  @Prop({ default: 300 }) private height!: number
  @Prop({ default: () => {} }) private params!: object

}
</script>
