export const error = (msg:{[key:string]:any}) => {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = state_Change
  function state_Change() {}
  xmlHttp.open('post', 'http://localhost:9000/react/log.png',true)
  xmlHttp.send(JSON.stringify(msg))
}

export const vuePlugin = (_Vue:any) => {
  if (!_Vue || !_Vue.config) return
  const vueErrorHandler = _Vue.config.errorHandler
  const wrapErrorHandler = function(err:Error,vm:any,info:string) {
    console.log('err',err)
    const componentRouteInfo = vm.$route
    // 组件路径，路由名称
    const { fullPath,name } = componentRouteInfo
    error({
      fullPath,
      routeName:name,
      errType:err.name,
      errInfo:info
    })
    vueErrorHandler.call(this,err,vm,info)
  }
  _Vue.config.errorHandler = wrapErrorHandler
}