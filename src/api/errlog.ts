import request from '@/utils/request'

export const error = (params: any) =>
  request({
    url: '/react/font-error',
    method: 'get',
    params
  })
