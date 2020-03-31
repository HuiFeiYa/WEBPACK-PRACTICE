<template>
  <div>
    这里是 avatar
    {{ value }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Avatar extends Vue {
  // You can add more Prop, see: https://github.com/dai-siki/vue-image-crop-upload#usage
  @Prop({ type: Object, required: true }) private value!: object
  @Prop({ required: true }) private width!: number
}
</script>
