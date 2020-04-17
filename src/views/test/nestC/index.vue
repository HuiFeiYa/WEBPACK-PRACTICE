<template>
  <div>
    <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos" />
    <child-component :text="text" @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
    <button class="yes" @click="callYes">Yes</button>
    <button class="no" @click="callNo">No</button>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  name: 'ParentComponent',
  components: { ChildComponent },
  data() {
    return {
      emitted: false,
      text: '',
      input: '',
      todos: ''
    }
  },
  methods: {
    onCustom() {
      this.emitted = true
    },
    addTodos(value) {
      console.log('value', value)
    },
    callYes() {
      this.callMe('yes')
    },
    callNo() {
      this.callMe('no')
    },
    callMe(value) {
      console.log(value)
    }
  }
}
</script>
