const context = require.context('./views', true, /\.vue/)
console.log('context',context('./Login.vue'), context.keys(),context.id)
var cache :any= {}

function importAll(r:any) {
  r.keys().forEach((key:any) => { cache[key] = r(key) })
}

importAll(context)
console.log('cache',cache)