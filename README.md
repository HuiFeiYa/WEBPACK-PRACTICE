# Vue Test Utils
## test-utils
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
## api 使用
### toContain 
`expect(wrapper.html()).toContain('<span class="count">0</span>')`
### contains
`expect(wrapper.contains('button')).toBe(true)`

### find
const button = wrapper.find('button')
### trigger
button.trigger('click')

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
