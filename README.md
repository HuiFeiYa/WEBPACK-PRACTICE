## 参考
[](https://vuedose.tips/tips/improve-performance-on-large-lists-in-vue-js/)
# 测试
## 添加 Jest vscode 插件
热更新检测 test,在 OUTPUT 中查看测试结果，不需要启动命令行
## 测试的优势
* 测试用例里非常清楚的阐释了开发者和使用者对于这端代码的期望和要求，也非常有利于代码的传承。
## Vue Test Utils
### mount
```
// Import the `mount()` method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Counter from './counter'

// Now mount the component and you have the wrapper
const wrapper = mount(Counter)

// You can access the actual Vue instance via `wrapper.vm`
const vm = wrapper.vm

```
### shallowMount
shallowMount 方法只挂载一个组件而不渲染其子组件
```
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(Component)
wrapper.vm // 挂载的 Vue 实例
```
### trigger 
在*该 wrapper dom 节点上触发一个事件*，如果我们想在这个 wrapper 上触发 change,blur 事件，那么首先这个 wrapper 必须是 input ,checkbox 这样本身拥有事件的dom否则无法触发。 
### 如何触发 el-input 的change blur 等事件
```
    // 返回匹配选择器中第一个dom节点
    // 首先找到 el-input 组件，然后在这个组件基础上找到它内部 input 元素，这个才是正则触发事件的对象
    const innerInput =  wrapper.find('.el-input').find('input')
    console.log('innerInput', innerInput.html())
    innerInput.trigger('blur')
    innerInput.trigger('change')
    // 注意这里并不会触发 input 事件，查看 element-ui el-input 组件，发现对于 input 事件触发加了限制代码截取在下面
    innerInput.trigger('input')
    innerInput.trigger('focus')
```

```
      // element-ui 对 input 事件触发做了限制，所以直接通过 .trigger('input') 是无法触发的，但是在原生的 input 事件由于没有做限制是可以触发的。
      handleInput(event) {
        // should not emit input during composition
        // see: https://github.com/ElemeFE/element/issues/10516
        if (this.isComposing) return;

        // hack for https://github.com/ElemeFE/element/issues/8548
        // should remove the following line when we don't support IE
        if (event.target.value === this.nativeInputValue) return;

        this.$emit('input', event.target.value);

        // ensure native input value is controlled
        // see: https://github.com/ElemeFE/element/issues/12850
        this.$nextTick(this.setNativeInputValue);
      },
```

## api 使用
### toContain 
`expect(wrapper.html()).toContain('<span class="count">0</span>')`
### contains
`expect(wrapper.contains('button')).toBe(true)`

### find
const button = wrapper.find('button')

返回匹配选择器的第一个 DOM 节点或 Vue 组件的 Wrapper。
* 可以通过 css 选择器作为参数
* 通过 ref 选择  wrapper.find({ ref: 'myButton' })

### findAll
返回一个 WrapperArray。 

通过 at() 来选中列表中某个 wrapper ，可以通过 html() 来查看他们具体长啥样。
```
const list = wrapper.findAll('.el-input')
console.log('list--------',list.at(0).html(),list.at(1).html())
```

### html
返回 Wrapper DOM 节点的 html 字符串
### trigger
button.trigger('click')
### setMethods
通过 test.fn 返回一个模拟的数据， .setMethods({increment:stub}) 会将组件中这个方法都替换为 mock 的函数。
```
  test('count 值',()=>{
    const stub = jest.fn(function(){
      console.log('this',this)
    })
    container.setMethods({
      increment:stub
    })
    container.find('.el-button').trigger('click')
    expect(stub).toBeCalled()
  })
```
### 获取组件中的值
```
data() {
  return {
    form: {
      userName: ''
    } 
  }
} 

// 在测试用例中获取 wrapper.vm.form.userName

expect(wrapper.vm.form.userName).toBe('')
```
## 常用技巧

### 从子组件触发事件
```
import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Parent from '@/views/test/nestC/index.vue'
import Child from '@/views/test/nestC/childComponent.vue'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(Parent)
    wrapper.find(Child).vm.$emit('custom')
    expect(wrapper.vm.emitted).toBe(true)
    // 注意这里要使用 Vue.nextTick 否则dom还没更新导致测试失败
    Vue.nextTick().then(()=>{
      expect(wrapper.html()).toContain('Emitted!')
    })
  })
})
```
### 必填值校验
jest 可以测试出是否传递必要 props 
```
// child
@Prop({ type: String, required: true }) private text!:string
```


### 操作当前组件状态

```
wrapper.setData({ count: 10 })

wrapper.setProps({ foo: 'bar' })
```
需要配合 Vue.nextTick 
```
const sen = shallowMount(Child,{
  propsData: {
    text:'传递值'
  }
})
sen.setProps({
  text: 'ccc'
})
Vue.nextTick().then(()=>{
  expect(sen.html()).toContain('ccc')
})
```
### 设置当前组件的 props 
```
const sen = shallowMount(Child,{
  propsData: {
    text:'传递值'
  }
})
```
### beforeEach(fn[, timeout])
> Runs a function *before each of the tests* in this file runs. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running the test. 统一处理一些全局文件中的一些事，如: wrapper = shallow(Login)

### Snapshot Testing
确保当前页面ui和上一次完全一致，会在本地报错上一次ui的文件,每当你想要确保你的UI不会有意外的改变，快照测试是非常有用的工具。

```
// 第一次会在当前目录下生成 __snapshots__ 相应的shot片段
// 第二次执行会在和本地文件对比，有修改就会报错
describe('snapshots 对比',()=>{
  test('对比前后快照',()=>{
    expect(container.element).toMatchSnapshot()
  })
})
```
# jest
## Additional Configuration
### Generate a basic configuration file
未在全局安装 jest 使用 ./node_modules/.bin/jest --init 初始化
全局安装使用 jest --init

### 检测
* 如果未在全局安装 jest `./node_modules/.bin/jest test/1.test.js `
* 被检测的文件后缀名要以 *.test.js* 结尾
## Using Matchers

### Common Matchers
```
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
* expect(2 + 2) returns an "expectation" object
* .toBe(4) is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.
* If you want to check the value of an object, use .toEqual() instead
* use opposite of a matcher 在前面加个 not 如： .not.toBe()

### Truthiness
* toBeNull matches only null
* toBeUndefined matches only undefined
* toBeDefined is the opposite of toBeUndefined
* toBeTruthy matches anything that an if statement treats as true
* toBeFalsy matches anything that an if statement treats as false

### Numbers
```
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

### Strings
.toMatch(reg) 来校验返回的字符串是否匹配这个正则规则
```
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

### describe(name, fn)
describe(name, fn) creates a block that groups together several related tests
```
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```
## expect 
When you're writing tests, you often need to check that values meet certain conditions. expect gives you access to a number of "matchers"(判断工具) that let you validate different things. 例如：toBe is a matcher function
## asynchronous code

### callback
下面代码会直接按步骤执行到 log ,不会等异步执行完，
```
// Don't do this!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
  console.log('执行了------')
});
```
use a single argument called done. Jest will wait until the done callback is called before finishing the test.

![](https://cdn.nlark.com/yuque/0/2020/png/309200/1587090259249-33a5b54d-0a33-48c7-b53b-14f5fcdab4b8.png)

If done() is never called, the test will fail (with timeout error), which is what you want to happen.
```
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

### promise 
```
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

m使用 promise 就可以不使用 done 参数，直接在 then 函数中使用测试
```
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
```

## 使用
> 前端的单元测试是不必一味追求测试覆盖率的。（当然你要想达到100%测试覆盖率也是没问题的，只不过如果要达到这样的效果你需要撰写非常多繁琐的测试用例，占用太多时间，得不偿失。）替代地，我们只需要回归测试的本源：给定输入，我只关心输出，不考虑内部如何实现。只要能覆盖到和用户相关的操作，能测试到页面的功能即可。

书写单元测试前先梳理要测的哪些点
* ui 方面，有哪些元素
* 逻辑处理方面，操作后有哪些响应
* 通过 vue-test-utils 来模拟用户操作，获取ui 然后通过 jest 提供的 expect 断言来对预期的结果进行判断。通过判断事件是否触发、元素是否存在、数据是否正确、方法是否被调用等等来对我们的组件进行比较全面的测试