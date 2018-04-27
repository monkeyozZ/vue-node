import LoadComponent from './importfile'
const main = LoadComponent('main/index')
const staticRoutes = [
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
  },
  {
    path: '/menu/index',
    component: main,
    children: [
      {
        path: '/menu/index',
        name: 'menuIndex',
        component: LoadComponent('menu/index')
      },
      {
        path: '/menu/insert',
        name: 'MenuInsert',
        component: LoadComponent('menu/insert')
      }
    ]
  },
  {
    path: '/power/index',
    component: main,
    children: [
      {
        path: '/power/index',
        name: 'powerIndex',
        component: LoadComponent('power/index')
      },
      {
        path: '/power/insert',
        name: 'powerInsert',
        component: LoadComponent('power/insert')
      }
    ]
  },
  {
    path: '*',
    redirect: '/401'
  },
  {
    path: '/401',
    redirect: '/error/401',
    component: main,
    children: [{
      path: '/error/401',
      component: LoadComponent('error/401')
    }]
  }
]

export default staticRoutes