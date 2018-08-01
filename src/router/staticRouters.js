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
      path: 'dashbodrd',
      name: 'dashbodrd',
      component: LoadComponent('index/index')
    }]
  },
  {
    path: '/recommend',
    redirect: '/recommend/horn',
    meta: { icon: 'recommend', title: '推荐管理', hidden: false },
    children: [
      {
        path: 'horn',
        name: 'recommendhorn',
        meta: { title: '滚动提示', hidden: false }
      },
      {
        path: 'loan',
        name: 'recommendloan',
        meta: { title: '贷款专区', hidden: false }
      },
      {
        path: 'card',
        name: 'recommendcard',
        meta: { title: '信用卡专区', hidden: false }
      }
    ]
  },
  {
    path: '/menu',
    redirect: '/menu/index',
    component: main,
    children: [
      {
        path: 'index',
        name: 'menuIndex',
        component: LoadComponent('menu/index')
      },
      {
        path: 'insert',
        name: 'MenuInsert',
        component: LoadComponent('menu/insert')
      }
    ]
  },
  {
    path: '/power',
    redirect: '/power/index',
    component: main,
    children: [
      {
        path: 'index',
        name: 'powerIndex',
        component: LoadComponent('power/index')
      },
      {
        path: 'insert',
        name: 'powerInsert',
        component: LoadComponent('power/insert')
      }
    ]
  },
  {
    path: '/role',
    redirect: '/role/index',
    component: main,
    meta: { icon: 'role', title: '角色管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'roleindex',
        component: LoadComponent('role/index'),
        meta: { title: '角色列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'roleinsert',
        component: LoadComponent('role/insert'),
        meta: { title: '添加角色', hidden: false }
      }
    ]
  },
  {
    path: '/account',
    redirect: '/account/index',
    component: main,
    meta: { icon: 'account', title: '账号管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'accountindex',
        component: LoadComponent('account/index'),
        meta: { title: '账号列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'accountinsert',
        component: LoadComponent('account/insert'),
        meta: { title: '添加账号', hidden: false }
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