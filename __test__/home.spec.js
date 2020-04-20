import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Home from '../src/views/home/index.vue'
import Page from '../src/views/test/tryJest/index.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
let container 
beforeEach(()=>{
  container = mount(Page)
})

describe('Element-ui 相关测试',()=>{
  test('到底有几个button', ()=>{
    const button = container.find('.el-button')
  })
})

