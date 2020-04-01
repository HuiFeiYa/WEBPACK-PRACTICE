import request from '@/utils/request'
// import request from 'src/utils/request'
console.log('request', request)

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })
