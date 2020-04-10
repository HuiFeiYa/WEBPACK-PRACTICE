/**
 * 将指定文件夹下的文件统一在一个文件中进行处理，减少每个文件的引用过程，统一在 map 中实现引入
 * @param path
 * @param ext
 */
interface Result {
  map: Function
}
interface Require {
  keys:(target?:string) => Result,
  (value:string):{default:string}
}
export const batchHandle = (path:string, ext:string) => {
  const reg = new RegExp('.' + ext)
  const req = require.context('./' + path, false, reg)
  let cache:any
  const requireAll = (requireContext:Require) => requireContext.keys().map((target:string) => {
    const key = target.slice(2).slice(0, -3)
    cache[key] = requireContext(target).default
  })
  requireAll(req)
}