import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'
import Parent from '@/views/test/nestC/index.vue'
import Child from '@/views/test/nestC/childComponent.vue'

describe('ParentComponent', () => {
  test("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(Parent)
    const sen = shallowMount(Child,{
      propsData: {
        text:'传递值'
      }
    })
    wrapper.find(Child).vm.$emit('custom')
    // sen.setProps({ text:'传递值' })
    expect(wrapper.vm.emitted).toBe(true)
    Vue.nextTick().then(()=>{
      expect(wrapper.html()).toContain('Emitted!')
    })
    sen.setProps({
      text: 'ccc'
    })
    Vue.nextTick().then(()=>{
      expect(sen.html()).toContain('ccc')
    })
  })

  test('element-ui input 测试', ()=>{
    // 测试 element-ui 时需要使用 mount 整个复制组件，因为这里的事件是进行封装的，如果不复制整个组件无法触发子组件的 emit 事件。
    const wrapper = mount(Parent)
    const stub = jest.fn((e)=>{})
    wrapper.setMethods({
      addTodos: stub
    })
    const input = wrapper.find('.el-input')
    input.trigger('keyup.enter')
    expect(stub).toBeCalled()
  })


  test('button has been click', ()=>{
    const wrapper = mount(Parent)
    wrapper.find('.yes').trigger('click')
    
  })
})