<template>
  <div>
      <el-breadcrumb class="path" v-show="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号列表</el-breadcrumb-item>
      </el-breadcrumb>
  <el-row>
     <el-col :xs="10" :sm="10" :md="20" :lg="20">
        <el-table
        v-loading="loading"
        :data="accountlist"
        border>
        <el-table-column
          label="序号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          >
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
          >
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="registerTime"
          >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.roleId, scope.row._id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-col>
  </el-row>
    <el-dialog title="用户角色修改" :visible.sync="dialogFormVisible" @close="remove">
      <el-form :model="Form" status-icon  ref="Form" label-width="100px" size="medium" :rules="rules">
        <el-form-item label="分配角色" prop="roleId">
            <el-select placeholder="请选择已有的角色" v-model="Form.roleId" clearable>
              <el-option :label="item.name" :value="item._id" v-if="titleArr" v-for="(item, index) in titleArr" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitform">保存</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>

<script>
import accountApi from '@/api/account'
export default {
  data () {
    return {
      breadcrumb: true,
      accountlist: [],
      loading: false,
      dialogFormVisible: false,
      titleArr: [],
      accountId: '',
      isdel: false,
      Form: {
        roleId: '',
        rolename: ''
      },
      rules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getaccountlist () {
      this.loading = true
      accountApi.accountlist().then((res) => {
        if (res.data.status === 200) {
          this.accountlist = res.data.accountlist
          this.loading = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getrolelist () {
      accountApi.roleindex().then((res) => {
        if (res.data.status === 200) {
          this.titleArr = res.data.rolelist
          this.titleArr.map((item, index) => {
            if (item._id === this.Form.roleId) {
              this.Form.rolename = this.titleArr[index].name
            }
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit (roleId, accountId) {
      this.dialogFormVisible = true
      this.Form.roleId = roleId
      this.accountId = accountId
    },
    handleDelete (accountid) {
      this.$confirm('确定要删除该角色吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        accountApi.Delaccount(accountid)
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
    updateaccount () {
      let id = this.accountId
      let obj = {
        roleId: this.Form.roleId,
        roleName: this.Form.rolename
      }
      accountApi.accountUpdate(obj, id)
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.getaccountlist()
          } else {
            this.$notify({
              title: '失败',
              message: res.data.message,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          this.$notify({
            title: '失败',
            message: err.message,
            type: 'error'
          })
        })
    },
    submitform () {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          this.updateaccount()
        }
      })
    },
    remove () {
      this.dialogFormVisible = false
    }
  },
  mounted () {
    this.getaccountlist()
  },
  watch: {
    'dialogFormVisible': function () {
      if (this.dialogFormVisible === true) {
        this.getrolelist()
      } else {
        this.Form.roleId = ''
      }
    },
    'Form.roleId': {
      handler () {
        this.titleArr.map((item, index) => {
          if (item._id === this.Form.roleId) {
            this.Form.rolename = this.titleArr[index].name
          }
        })
      }
    },
    '$route': 'getaccountlist',
    'isdel': 'getaccountlist',
    deep: true

  }
}
</script>

<style lang="stylus" scoped>
  .el-form-item
    .el-button
      float right
</style>
