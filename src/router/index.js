import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index'
import index from '@/components/index'
import dashbodrd from '@/views/index/index'
import uploadExcel from '@/views/excel/uploadExcel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      redirect: '/dashbodrd',
      component: index,
      children: [{
        path: '/dashbodrd',
        name: 'dashbodrd',
        component: dashbodrd
      }]
    },
    {
      path: '/uploadexcel',
      redirect: '/excel/upload',
      component: index,
      children: [{
        path: '/excel/upload',
        name: 'uploadExcel',
        component: uploadExcel
      }]
    }
  ]
})