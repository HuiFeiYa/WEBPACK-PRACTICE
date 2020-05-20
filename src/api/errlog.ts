import request from '@/utils/request'

export const error = (params?:unknown) =>
  // console.log('params', params)
  request.post('/font-error', {
    params
  })
