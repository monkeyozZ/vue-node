<template>
  <div>
    <el-breadcrumb class="path" v-show="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加角色</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
      <el-form :model="Form" status-icon  ref="Form" label-width="100px" size="medium" :rules="rules">
        <el-col :xs="10" :sm="10" :md="8" :lg="8">
          <el-form-item label="角色名称" prop="name">
            <el-input type="text" auto-complete="off" v-model="Form.name" placeholder="请填写角色名称"></el-input>
          </el-form-item>
          <el-form-item label="分配权限">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedpower" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in powerarr" :label="item" :key="item._id">{{item}}</el-checkbox>
              </el-checkbox-group>
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
import powerApi from '@/api/power'
import roleApi from '@/api/role'
export default {
  props: ['id'],
  data () {
    return {
      breadcrumb: true,
      Form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ]
      },
      checkAll: false,
      checkedpower: [],
      powerarr: [],
      idarr: '',
      isIndeterminate: false
    }
  },
  methods: {
    submitForm () {
      this.$refs.Form.validate((res) => {
        if (res) {
          if (this.checkedpower.length === 0) {
            this.$message.error('至少选择一项权限进行分配')
          }
          if (this.id) {
            this.updatedrole()
          } else {
            this.insertrole()
          }
        }
      })
    },
    handleCheckAllChange (val) {
      this.checkedpower = val ? this.powerarr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.powerarr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.powerarr.length
    },
    getpowerlist () {
      powerApi.powerindex().then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.powerlist)
          res.data.powerlist.forEach(item => {
            this.powerarr.push(item.title)
          })
        }
      })
    },
    insertrole () {
      roleApi.setrole(this.Form.name, this.idarr).then((res) => {
        if (res.data.status === 200) {
          this.Form.name = ''
          this.checkedpower = []
          this.idarr = ''
          this.checkAll = false
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          })
          this.$router.push({path: '/role/index'})
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    updatedrole () {
      let obj = {
        name: this.Form.name,
        id: this.idarr
      }
      roleApi.roleUpdate(obj, this.id)
        .then((res) => {
          if (res.data.status === 200) {
            this.$emit('closeModel')
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.$emit('initid') // 防止再次修改这条记录时数据不同步
            this.$emit('initdata') // 同步修改后的数据
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
    initidarr () {
      let l = this.checkedpower.length
      let str = ''
      this.checkedpower.forEach((item, index) => {
        if (index !== l - 1) {
          str += item + ','
        } else {
          str += item
        }
      })
      this.idarr = str
    },
    getonelist () {
      roleApi.GetOneList(this.id)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res)
            this.Form.name = res.data.Onelist[0].name
            this.checkedpower = res.data.Onelist[0].id.split(',')
            let checkedCount = this.checkedpower.length
            this.checkAll = checkedCount === this.powerarr.length
          }
        })
    },
    reset () {
      this.Form.name = ''
      this.checkedpower = []
    },
    hidetreenav () {
      this.breadcrumb = false
    },
    showtreenav () {
      this.breadcrumb = false
    }
  },
  mounted () {
    this.getpowerlist()
  },
  watch: {
    checkedpower: 'initidarr',
    id: {
      handler () {
        if (this.id) {
          setTimeout(() => {
            this.getonelist()
          }, 20)
        }
      },
      immediate: true
    },
    deep: true
  }
}
</script>

<style lang="stylus" scoped>
.el-checkbox
  margin-left 30px
.el-row
    padding-top 22px
    border 1px solid #ebebeb
    border-radius 3px
    transition .2s
</style>
