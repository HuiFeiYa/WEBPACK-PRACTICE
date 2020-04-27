// import Search from 'COMPONENT/page/customerManage/searchArticle/index.vue'
import Search from './index.vue'
import page from '@/components/mixins/page.js'
import { shallowMount,mount } from '@vue/test-utils'
import Vue from 'vue'
import ElementUi from 'element-ui'
Vue.use(ElementUi)
const wrapper = mount(Search,{
  mixins:[page],
  data(){
    return {
      beCalled:false
    }
  }
})
describe('测试 page',()=>{
   // 找到 pagination 中 1，2，3 数字对应的 dom 点击触发它的点击事件
   const dom = wrapper.find('.el-pagination').find('.el-pager').find('li')
  it('pagination', async () => {
    const handleCurrentChange = jest.fn(()=>{
    })
    // 模拟组件中的方法
    // wrapper.setMethods({
    //   handleCurrentChange
    // })
    dom.trigger('click')
    await Vue.nextTick()
    // expect(handleCurrentChange).toBeCalled()
  })

  it('size-change',async()=>{
    // 找到下拉框，并且点击第二个选项，实现size-change的改变
    const dom = wrapper.find('.el-pagination').find('.el-select').findAll('.el-select-dropdown__item').at(1)
    dom.trigger('click')
    console.log('dom',dom.html())
    await Vue.nextTick()
    // expect(handleSizeChange).toBeCalled()
  })
  it('搜索条件变更后搜索', async () => {
    const button = wrapper.find('.el-button')

    const fn = jest.fn()
    const search = jest.fn(()=>{
      fn()
    })
    // wrapper.setMethods({
    //     search
    // })
    // console.log('dom.element', button.element)
    // button.element.value = 11111
    button.trigger('click')
    // expect(search).toBeCalled()
  })
})