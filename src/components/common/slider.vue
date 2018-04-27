<template>
    <el-menu
    class="menu-box"
    :router="true"
    background="#303133"
    color="#fff"
    :collapse="isCollapse">
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
          meta: {icon: 'Excel', title: 'Excel'},
          children: [
            {
              path: '/excel/upload',
              meta: {title: '上传Excel', hidden: false}
            },
            {
              path: '/excel/export',
              meta: {title: '导出Excel', hidden: false}
            },
            {
              meta: {title: '333', icon: 'Excel'},
              children: [
                {
                  path: '/excel/upload',
                  meta: {title: '22222', hidden: false}
                },
                {
                  path: '/excel/export',
                  meta: {title: '1111', hidden: true}
                }
              ]
            }
          ]
        },
        {
          meta: {icon: 'manage', title: '菜单管理', hidden: false},
          children: [
            {
              path: '/menu/index',
              meta: {title: '菜单列表', hidden: false}
            },
            {
              path: '/menu/insert',
              meta: {title: '添加菜单', hidden: false}
            }
          ]
        },
        {
          meta: {icon: 'power', title: '权限管理', hidden: false},
          children: [
            {
              path: '/power/index',
              meta: {title: '权限列表', hidden: false}
            },
            {
              path: '/power/insert',
              meta: {title: '添加权限', hidden: false}
            },
            {
              path: '/role',
              meta: {icon: 'role', title: '角色管理', hidden: false},
              children: [
                {
                  path: 'role/index',
                  meta: {title: '角色列表', hidden: false}
                },
                {
                  path: 'role/insert',
                  meta: {title: '添加角色', hidden: false}
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