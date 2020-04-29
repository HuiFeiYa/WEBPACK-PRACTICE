import request from '@/utils/request'
export const login = (params:{userName:string, password:string|number}) => {
  return request.post('/login', params)
}