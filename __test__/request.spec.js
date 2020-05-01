import Vue from 'vue'
import Login from '../src/views/Login.vue'
import { shallowMount,mount } from '@vue/test-utils'
import axios from 'axios'
import ElementUi from 'element-ui'
import {login} from '@/api/login'
Vue.use(ElementUi)
jest.mock('axios')
// 需要将mock数据放在 describe 外面，这样组件中的生命周期中都可以获得模拟数据
axios.post.mockResolvedValue({result:'success'});
let wrapper = mount(Login)
describe('测试 axios',()=>{
  it('mockImplementationOnce', async () => {
    // axios.post.mockImplementation(() => {
    //   return Promise.resolve({name:1})
    // })
    
    // await Vue.nextTick()
    // wrapper.find('.el-button').trigger('click')

  })
})