import Vue from 'vue'
import ElementUI,{ Input } from 'element-ui'
import Login from '@/views/Login.vue'
import { shallowMount,mount } from '@vue/test-utils'
Vue.use(ElementUI)
let wrapper
let vm
beforeEach(()=>{
  wrapper = mount(Login)
  vm = wrapper.vm
})
describe('输入框值改变',()=>{
  it('user 输入',async ()=>{
      const onNanmeChange = jest.fn(()=>{
        console.log('1111')
        // vm.form.userName = '张三'
        wrapper.setData({
          form: {
            userName: '张三'
          }
        })
      })
    // wrapper.setMethods({
    //   onNameChange:jest.fn(()=>{
    //     console.log(222)
    //   })
    // })
    //  const user = wrapper.findAll('.el-input').at(0)
    const innerInput =  wrapper.find('.user').find('input')
    console.log('innerInput', innerInput.html())
    innerInput.trigger('blur')
    innerInput.trigger('change')
    innerInput.trigger('input')
    innerInput.trigger('focus')
    // await user.vm.$nextTick()
    // expect(inputWrapper.emitted().input).toBeTruthy()
    // expect(onNanmeChange).toHaveBeenCalled()
    //  Vue.nextTick().then(()=>{
    //     expect(wrapper.vm.form.userName).toBe('张三')
    //  }).catch(err=>{
    //    console.log('err----',err)
    //  })
  })

  // it('compare 参照',()=>{
  //   const compareWrapper = wrapper.find('.compare')
  //   console.log('compareWrapper',compareWrapper.html() )
  //   compareWrapper.trigger('focus')
  //   compareWrapper.trigger('input')
  // })
})

// describe('检验 Login 组件',()=>{
//   test('点击登陆触发',()=>{
//     wrapper.find('.el-button').trigger('click')
//     const user = wrapper.find('user')
//     const password = wrapper.find('password')
//     // 当提交时 userName 和 password 不能为空值
//     // 使用 toBeTruthy() 由于 el-input v-model 绑定的值是 string 类型，所以不需要担心 0 false 等这种情况
//     // expect(wrapper.vm.form.userName).toBeTruthy()
//   })
// })