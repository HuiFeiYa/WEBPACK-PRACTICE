import { shallowMount } from '@vue/test-utils'
import Home from '../src/views/home/index.vue'
// import Page from '../src/views/tryJest/index.vue'
describe('test home search input', () => {
  it('输入如何进行单元测试', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.vm.search).toBe('')
  })
})