import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import Router, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName Login */ '@/views/Login.vue'),
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/chart/index',
    meta: {
      title: '主页',
      icon: 'home_bar'
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "login" */ '../views/home/index.vue'),
        meta: {
          title: '主页',
          icon: 'home_bar'
        }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/index',
    meta: {
      title: '图表',
      icon: 'tubiao'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "chart" */ '../views/chart/line-chart.vue'),
        name: 'Chart',
        meta: {
          title: '线性图表'
        }
      },
      {
        path: 'index1',
        component: () => import(/* webpackChunkName: "chart" */ '../views/chart/bar-chart.vue'),
        name: 'Chart',
        meta: {
          title: '饼状图表'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    meta: {
      title: '错误页面',
      icon: 'error'
    },
    children: [
      {
        path: '404',
        component: () => import(/* webpackChunkName: "chart" */ '../views/err-log/404.vue'),
        name: '404',
        meta: {
          title: '404'
        }
      },
      {
        path: '401',
        component: () => import(/* webpackChunkName: "chart" */ '../views/err-log/401.vue'),
        name: '401',
        meta: {
          title: '401'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
        name: 'test',
        meta: {
          title: 'test',
          icon: 'fengxianpianhaoceshi'
        }
      }
    ]
  },
  {
    path: '/element',
    component: Layout,
    meta: {
      title: 'Element-ui 测试'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "element-ui" */'../views/elementUi/index.vue'),
        name: 'ElementUi',
        meta: {
          title: 'Element 测试'
        }
      }
    ]
  },
  {
    path: '/playground',
    component: Layout,
    meta: {
      title: 'js playground',
      icon: 'chongwuxunlian'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "element-ui" */'../views/playground/scroll.vue'),
        name: 'playground',
        meta: {
          title: 'js 集合'
        },
        children: [
          {
            path: 'scroll',
            name: 'Scroll',
            meta: {
              title: '滚动'
            }
          }
        ]
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
