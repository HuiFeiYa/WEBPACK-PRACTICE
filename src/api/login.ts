import request from '@/utils/request'
export const login = (params:{userName:string, password:string|number}) => {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}