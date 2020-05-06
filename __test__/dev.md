### todo
* 有些事件需要 await Vue.trigger('click') 才会更新状态，有些不需要
  * 目前是 el-button 的click 事件不需要，el-pagination 内部触发 click 事件有些是需要的


## 测试

### 书写习惯

*预先定义和结束测试重置:* 在写单元测试时，可以将获取 wrapper 之类的全局操作放在 beforeEach 中，而充值数据状态的可以放在 afterEach
```
  beforeEach(() => {
    console.log(2)
    defaultWrapper = mount(<BizTable {...defaultProps}/>);
  });

  afterEach(() => {
    console.log(5)
    defaultProps.getData.resetHistory();
    defaultProps.updateParams.resetHistory();
  });
  console.log(1)
  describe('测试 svgicon', () => {
    console.log(3)
    it('description', async () => {
      console.log(4)
      // 这里才能拿到 wrapper 对象
      console.log('这里是 it inner')
    })
  })
```

*describe和it语法*  

我们将使用通常所见的 describe 和 it 语法，由 Jest 提供。describe 一般概述了测试会包含什么，在本例中写的是 Greeting.vue。it 表示测试应该完成的主题中一段单独的职责。随着我们为组件添加更多特性，在测试中就会添加更多 it 块。

### 测试部分
* uitls 工具
* api 请求，将 reqest 单独封装在一个文件中，其他文件只是引入执行时传参数进来，可以对每个 request实例进行测试。
* components 
  * 测试 dom / 组件是否存在 
  ```
    wrapper.childAt(0).hasClass('toolbarContainer')
    wrapper.find(Col).at(1).hasClass('searchCol')
  ```
* vuex 中 action mutation state 相关逻辑测试
