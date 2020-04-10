import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import Router, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)
export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: {
      title: '登陆页'
    }
  },
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/index',
    meta: {
      title: '图表'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "chart" */ '../views/chart/line-chart.vue'),
        name: 'Chart',
        meta: {
          title: '线性图表'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    meta: {
      title: '错误页面',
      icon: 404
    },
    children: [
      {
        path: '404',
        component: () => import(/* webpackChunkName: "chart" */ '../views/err-log/index.vue'),
        name: '404',
        meta: {
          title: '404'
        }
      }
    ]
  }
  // {
  //   path: '/',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  // },
  // {
  //   path: '/permission',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  //   meta: {
  //     title: '权限管理',
  //     roles: ['admin', 'editor']
  //   }
  // }
]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export default router
