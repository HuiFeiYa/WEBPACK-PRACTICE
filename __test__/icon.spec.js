import SvgIcon from '@/components/SvgIcon/index.vue'
import { shallowMount,mount } from '@vue/test-utils'
import Vue from 'vue'
let wrapper = mount(SvgIcon,{
  propsData: {
    iconClass:'#icon-user'
  }
})
beforeEach(()=>{
  wrapper = mount(SvgIcon,{
    propsData: {
      iconClass:'#icon-user',
      className:'张三',
      aaaa:11111
    }
  })
})
describe('测试 svgicon', () => {
  // expect(div.is('div')).toBe(true)
  // wrapper.find('.icon').html()
  it('description', async () => {
    await Vue.nextTick()
    console.log(wrapper.vm.aaa)
  })
})
