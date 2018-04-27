<template>
  <div>
     <el-breadcrumb class="path">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tree
      :data="MenuList"
      :props="defaultProps"
      accordion
      :default-expand-all="true"
      :expand-on-click-node="false"
      :render-content="renderContent"
    >
    </el-tree>
    <el-dialog title="修改菜单" :visible.sync="dialogFormVisible" @close="remove">
      <v-edit :id="id" ref="reset" v-on:closeModel="closemodel"></v-edit>
    </el-dialog>
  </div>
</template>

<script>
import edit from './insert'
import MenuApi from '@/api/menu'
export default {
  data () {
    return {
      MenuList: [],
      defaultProps: {
        children: 'children',
        label: 'meta'
      },
      dialogFormVisible: false,
      id: null,
      isdel: false
    }
  },
  components: {
    'v-edit': edit
  },
  created () {
    this.GetList()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'GetList',
    'dialogFormVisible': 'GetList',
    'isdel': 'GetList'
  },
  methods: {
    GetList () {
      MenuApi.GetMenuList()
        .then((res) => {
          if (res.status === 200) {
            // console.log(res)
            this.MenuList = res.data.MenuTree
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    edit (data) {
      this.dialogFormVisible = true
      this.id = data._id
    },

    remove () {
      this.$refs.reset.reset()
      this.id = ''
    },
    del (data) {
      this.$confirm('确定要删除该级菜单吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        MenuApi.DelOneMenu(data._id)
          .then((res) => {
            if (res.data.status === 200) {
              this.isdel = !this.isdel
              this.$notify({
                title: '成功',
                message: res.data.message,
                type: 'success'
              })
            } else {
              this.$notify({
                title: '失败',
                message: res.data.message,
                type: 'error'
              })
            }
          })
      })
    },
    closemodel () {
      this.dialogFormVisible = false
      this.$refs.reset.reset()
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node" style="flex: 1; display: flex; align-items: center; font-size: 14px; padding-right: 8px;">
          <span style="width: 100%">{node.label[0].title}</span>
          <span>
            <el-button size="mini" type="primary" icon="el-icon-edit" circle on-click={ () => this.edit(data) }></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle on-click={ () => this.del(data) }></el-button>
          </span>
        </span>)
    }
  }
}
</script>

<style lang="stylus">
.el-tree
  width 90%
  margin 0 auto
  padding 10px
  box-sizing border-box
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  .el-tree-node__content
    height 45px
</style>
