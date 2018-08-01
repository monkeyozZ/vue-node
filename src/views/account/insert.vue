<template>
  <div>
    <el-breadcrumb class="path" v-show="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加账号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-form :model="Form" status-icon  ref="Form" label-width="100px" size="medium" :rules="rules">
        <el-col :xs="10" :sm="10" :md="8" :lg="8">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" auto-complete="off" v-model="Form.name" placeholder="请填写用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" auto-complete="off" v-model="Form.password" placeholder="请填写密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input type="password" auto-complete="off" v-model="Form.password1" placeholder="请再次填写密码"></el-input>
          </el-form-item>
          <el-form-item label="分配角色" prop="roleId">
              <el-select placeholder="请选择已有的角色" v-model="Form.roleId" clearable>
                <el-option :label="item.name" :value="item._id" v-if="titleArr" v-for="(item, index) in titleArr" :key="index"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitform">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import accountApi from '@/api/account'
import roleApi from '@/api/role'
export default {
  data () {
    var validatename = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.Form.name !== '') {
          await accountApi.checkname(this.Form.name).then(function (response) {
            if (response.data.status === -200) {
              callback(new Error('用户名已占用'))
            }
          }).catch((err) => {
            this.$notify({
              title: '失败',
              message: err.message,
              type: 'error'
            })
          })
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.Form.password !== '') {
          this.$refs.Form.validateField('password1')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.Form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      Form: {
        name: '',
        password: '',
        password1: '',
        roleId: '',
        rolename: ''
      },
      breadcrumb: true,
      rules: {
        name: [
          { validator: validatename, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password1: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      titleArr: []
    }
  },
  methods: {
    submitform () {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          this.accountinsert()
        }
      })
    },
    accountinsert () {
      let obj = {
        username: this.Form.name,
        password: this.Form.password,
        roleId: this.Form.roleId,
        rolename: this.Form.rolename
      }
      accountApi.insertaccount(obj)
        .then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.$refs.Form.resetFields()
            this.$router.push({path: '/account/index'})
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
    getrolelist () {
      roleApi.roleindex().then((res) => {
        if (res.data.status === 200) {
          this.titleArr = res.data.rolelist
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getrolelist()
  },
  watch: {
    'Form.roleId': {
      handler () {
        this.titleArr.map((item, index) => {
          if (item._id === this.Form.roleId) {
            this.Form.rolename = this.titleArr[index].name
          }
        })
      }
    },
    deep: true
  }
}
</script>

<style lang="stylus" scoped>
  .el-row
    padding-top 22px
    border 1px solid #ebebeb
    border-radius 3px
    transition .2s
    .el-button
      float right
</style>
