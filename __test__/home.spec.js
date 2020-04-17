import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Home from '../src/views/home/index.vue'
import Page from '../src/views/test/tryJest/index.vue'



describe("Counter", ()=>{
  const wrapper = mount(Page)
  const vm = wrapper.vm 
  // 检验页面元素
  test('renders the correct markup', ()=>{
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })
  test('has a button', ()=>{
    expect(wrapper.contains('button')).toBe(true)
  })

  // 检验事件
  test('button click shounld increment the count', ()=>{
    expect(vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(vm.count).toBe(1)
  })
})


test('async', ()=>{
  function callback(data){
    console.log('callback-------')
    expect(data).toBe('延迟')
  }
  function delay(){
    return new Promise(resolve=>{
      setTimeout(() => {
        console.log('delay-------')
        resolve('延迟')
      }, 2000);
    })
  }
  return delay().then(callback)
})


describe('nextTick',()=>{
  test('will time out', done =>{
    Vue.nextTick(()=>{
      expect(true).toBe(false)
      // done()
    })
  })
})