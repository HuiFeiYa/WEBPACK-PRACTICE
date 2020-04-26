// jest.mock('lodash')
import lodash from  '../__mocks__/lodash'
describe('测试手动模拟数据',()=>{
  it('lodash 使用',()=>{
    expect(lodash.getName()).toBe('dd')
  })
})