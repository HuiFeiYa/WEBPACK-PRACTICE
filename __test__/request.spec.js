import Vue from 'vue'
import Login from '../src/views/Login.vue'
import { shallowMount,mount } from '@vue/test-utils'
import axios from 'axios'
import ElementUi from 'element-ui'
import {login} from '@/api/login'
Vue.use(ElementUi)
jest.mock('axios')
const result = {userName: 'admin',password: '2222'}
// 需要将mock数据放在 describe 外面，这样组件中的生命周期中都可以获得模拟数据
axios.post.mockResolvedValue(result);
let wrapper = mount(Login)
describe('测试 axios',()=>{
  it('mockImplementationOnce', async () => {
    axios.post.mockImplementation(() => {
      return Promise.resolve({msg:'success',data:{value:1},code:10000})
    })
    axios.get.mockImplementation(() => {
      return Promise.resolve({msg:'fail',code:99999})
    })
  })
})


describe('login 组件',()=>{
  it('userName input change',async ()=>{
    const onBlur = jest.fn(()=>{
      console.log('mock-onBlur')
    })
    wrapper.setMethods({
      onBlur
    })
    const input = wrapper.find('.el-input').find('input')
    console.log('input',input)
    input.trigger('blur')
    await Vue.nextTick()
  })
})