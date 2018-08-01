<template>
  <div>
    <el-breadcrumb class="path" v-show="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-form :model="Form" status-icon  ref="Form" label-width="100px" size="medium" :rules="rules">
        <el-col :xs="10" :sm="10" :md="8" :lg="8">
          <el-form-item label="权限名称" prop="title">
            <el-input type="text" auto-complete="off" v-model="Form.title" placeholder="请填写权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限URL" prop="path">
            <el-input type="text" auto-complete="off" v-model="Form.path" placeholder="请填写权限URL"></el-input>
          </el-form-item>
          <el-form-item label="权限版本" prop="version">
            <el-input type="text" auto-complete="off" v-model="Form.version" placeholder="请填写权限版本"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" >提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import PowerApi from '@/api/power'
export default {
  props: ['id'],
  data () {
    return {
      Form: {
        title: '',
        path: '',
        version: '1.0.0'
      },
      rules: {
        title: [
          { required: true, message: '请填写权限名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请填写权限URL', trigger: 'blur' }
        ]
      },
      breadcrumb: true
    }
  },
  methods: {
    submitForm () {
      this.$refs.Form.validate((res) => {
        if (res) {
          if (this.id) {
            this.powerUpdate(this.Form, this.id)
          } else {
            this.Powerinsert(this.Form)
          }
        }
      })
    },
    Powerinsert (obj) {
      PowerApi.insertpower(obj).then((res) => {
        if (res.data.status === 200) {
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          })
          this.$router.push({path: '/power/index'})
          this.$refs.Form.resetFields()
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    powerUpdate (mdata, id) {
      PowerApi.powerUpdate(mdata, id)
        .then((res) => {
          if (res.data.status === 200) {
            this.$emit('closeModel')
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.$emit('initid') // 防止再次修改这条记录时数据不同步
            this.$emit('initdata')
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
    getonelist () {
      PowerApi.GetOneList(this.id)
        .then((res) => {
          if (res.data.status === 200) {
            this.breadcrumb = !this.breadcrumb
            this.Form.title = res.data.Onelist[0].title
            this.Form.path = res.data.Onelist[0].path
            this.Form.version = res.data.Onelist[0].version
            // console.log(res.data.Onelist[0])
          }
        })
    },
    reset () {
      this.$refs.Form.resetFields()
    },
    hidetreenav () {
      this.breadcrumb = false
    },
    showtreenav () {
      this.breadcrumb = false
    }
  },
  watch: {
    id: {
      handler () {
        if (this.id) {
          this.getonelist()
        }
      },
      immediate: true
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