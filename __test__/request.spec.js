import Vue from 'vue'
import Login from '../src/views/Login.vue'
import { shallowMount,mount } from '@vue/test-utils'
import axios from 'axios'
import ElementUi from 'element-ui'
import {login} from '@/api/login'
Vue.use(ElementUi)
jest.mock('axios')
// mockAxios.post.mockImplementationOnce(()=>{
//   return Promise.resolve({
//     data:'long text'
//   })
// })
let wrapper = mount(Login)
describe('测试 axios',()=>{
  it('mockImplementationOnce', async () => {
    // axios.post.mockImplementation(() => {
    //   return Promise.resolve({name:1})
    // })
    axios.post.mockResolvedValue({result:1});
    wrapper.find('.el-button').trigger('click')
    await Vue.nextTick()

  })
})