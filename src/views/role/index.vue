<template>
  <div>
      <el-breadcrumb class="path" v-show="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
  <el-row>
     <el-col :xs="10" :sm="10" :md="20" :lg="20">
        <el-table
        v-loading="loading"
        :data="rolelist"
        border>
        <el-table-column
          label="序号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="name"
          >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-col>
  </el-row>
  <el-dialog title="角色权限修改" :visible.sync="dialogFormVisible" @close="remove">
      <v-edit :id="id" @initid="initid" @initdata="getrolelist" ref="reset" v-on:closeModel="closemodel"></v-edit>
  </el-dialog>
  </div>
</template>

<script>
import roleApi from '@/api/role'
import edit from './insert.vue'
export default {
  components: {
    'v-edit': edit
  },
  data () {
    return {
      breadcrumb: true,
      rolelist: [],
      loading: false,
      dialogFormVisible: false,
      id: '',
      isdel: false
    }
  },
  methods: {
    getrolelist () {
      this.loading = true
      roleApi.roleindex().then((res) => {
        if (res.data.status === 200) {
          this.rolelist = res.data.rolelist
          this.loading = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit (roleid) {
      this.dialogFormVisible = true
      this.id = roleid
    },
    handleDelete (roleid) {
      this.$confirm('确定要删除该角色吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleApi.DelOnerole(roleid)
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
    remove () {
      this.$refs.reset.reset()
      this.id = ''
    },
    closemodel () {
      this.dialogFormVisible = false
      this.id = ''
      this.$refs.reset.reset()
    },
    initid () {
      this.id = ''
    }
  },
  mounted () {
    this.getrolelist()
  },
  watch: {
    '$route': 'getrolelist',
    'dialogFormVisible': {
      handler () {
        if (this.dialogFormVisible === true) {
          setTimeout(() => {
            this.$refs.reset.hidetreenav()
          }, 20)
        } else {
          setTimeout(() => {
            this.$refs.reset.showtreenav()
          }, 20)
        }
      }
    },
    'isdel': 'getrolelist'
  }
}
</script>

<style lang="stylus" scoped>

</style>
