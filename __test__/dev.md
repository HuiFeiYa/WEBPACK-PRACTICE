### todo
* 有些事件需要 await Vue.trigger('click') 才会更新状态，有些不需要
  * 目前是 el-button 的click 事件不需要，el-pagination 内部触发 click 事件有些是需要的