<template>
    <el-menu
    class="menu-box"
    :router="true"
    background="#303133"
    color="#fff"
    :collapse="isCollapse"
    :default-active="$route.path">
      <menu-item :routers="routers"></menu-item>
    </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import MenuItem from './MenuItem'
export default {
  name: 'mymenu',
  components: {
    'menu-item': MenuItem
  },
  data () {
    return {
      routers: [
        {
          path: '/index',
          meta: {icon: 'index', title: '首页', hidden: false}
        },
        {
          path: '/loan',
          meta: {icon: 'loan', title: '贷款管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'loanindex',
              meta: {title: '贷款列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'loaninsert',
              meta: {title: '添加贷款', hidden: false}
            }
          ]
        },
        {
          path: '/card',
          meta: {icon: 'card', title: '信用卡管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'cardindex',
              meta: {title: '信用卡列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'cardinsert',
              meta: {title: '添加信用卡', hidden: false}
            }
          ]
        },
        {
          meta: {icon: 'Excel', title: 'Excel', hidden: true},
          children: [
            {
              path: '/excel/upload',
              meta: {title: '上传Excel', hidden: false}
            },
            {
              path: '/excel/export',
              meta: {title: '导出Excel', hidden: false}
            }
          ]
        },
        {
          path: '/recommend',
          redirect: '/recommend/horn',
          meta: {icon: 'recommend', title: '推荐管理', hidden: true},
          children: [
            {
              path: 'horn',
              name: 'recommendhorn',
              meta: {title: '滚动提示', hidden: false}
            },
            {
              path: 'loan',
              name: 'recommendloan',
              meta: {title: '贷款专区', hidden: false}
            },
            {
              path: 'card',
              name: 'recommendcard',
              meta: {title: '信用卡专区', hidden: false}
            }
          ]
        },
        {
          path: '/menu',
          redirect: '/menu/index',
          meta: {icon: 'manage', title: '菜单管理', hidden: true},
          children: [
            {
              path: 'index',
              name: 'menuindex',
              meta: {title: '菜单列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'menuinsert',
              meta: {title: '添加菜单', hidden: false}
            }
          ]
        },
        {
          path: '/power',
          redirect: '/power/index',
          meta: {icon: 'power', title: '权限管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'powerindex',
              meta: {title: '权限列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'powerinsert',
              meta: {title: '添加权限', hidden: false}
            },
            {
              path: '/role',
              redirect: '/role/index',
              meta: {icon: 'role', title: '角色管理', hidden: true},
              children: [
                {
                  path: 'index',
                  name: 'roleindex',
                  meta: {title: '角色列表', hidden: false}
                },
                {
                  path: 'insert',
                  name: 'roleinsert',
                  meta: {title: '添加角色', hidden: false}
                }
              ]
            },
            {
              path: '/account',
              redirect: '/account/index',
              meta: {icon: 'account', title: '账号管理', hidden: true},
              children: [
                {
                  path: 'index',
                  name: 'accountindex',
                  meta: {title: '账号列表', hidden: false}
                },
                {
                  path: 'insert',
                  name: 'accountinsert',
                  meta: {title: '添加账号', hidden: false}
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'isCollapse'
    })
  }
}
</script>

<style lang="stylus" scoped>
.menu-box
  min-height calc(100vh - 100px)
.menu-box:not(.el-menu--collapse)
    width 200px
</style>