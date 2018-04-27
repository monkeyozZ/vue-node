import Vue from 'vue'
import Router from 'vue-router'
import staticRouters from './staticRouters'

Vue.use(Router)

/* const staticRouters = [
  {
    path: '/',
    redirect: '/login',
    component: LoadComponent('login/index')
  },
  {
    path: '/login',
    name: 'login',
    component: LoadComponent('login/index')
  },
  {
    path: '/index',
    redirect: '/index/dashbodrd',
    component: main,
    children: [{
      path: '/index/dashbodrd',
      name: '/index/dashbodrd',
      component: LoadComponent('index/index')
    }]
  }
] */

const router = new Router({
  /* routes: [
    {
      path: '/',
      redirect: '/login',
      component: _import('login/index')
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/index')
    },
    {
      path: '/index',
      redirect: '/index/dashbodrd',
      component: _import('main/index'),
      children: [{
        path: '/index/dashbodrd',
        name: '/index/dashbodrd',
        component: _import('index/index')
      }]
    },
    {
      path: '/excel/upload',
      component: _import('main/index'),
      children: [{
        path: '/excel/upload',
        name: 'uploadExcel',
        component: _import('excel/uploadExcel')
      }]
    },

    {
      path: '/menu/index',
      component: _import('main/index'),
      children: [
        {
          path: '/menu/index',
          name: 'menuIndex',
          component: _import('menu/index')
        },
        {
          path: '/menu/insert',
          name: 'MenuInsert',
          component: _import('menu/insert')
        }
      ]
    }
  ] */
  mode: 'history',
  routes: staticRouters
})

export default router