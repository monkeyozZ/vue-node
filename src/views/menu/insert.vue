<template>
  <div>
   <el-breadcrumb class="path" v-show="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加菜单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-form :model="Form" status-icon  ref="Form" label-width="100px" size="medium" :rules="rules">
        <el-col :xs="10" :sm="10" :md="8" :lg="8">
        <el-form-item label="父级菜单" prop="parentId">
            <el-select placeholder="请选择父级菜单" v-model="Form.parentId" clearable>
              <el-option label="顶级菜单" value="0"></el-option>
              <el-option :label="item.title" :value="item._id" v-if="titleArr" v-for="(item, index) in titleArr" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input type="text" auto-complete="off" v-model="Form.title" placeholder="请填写菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path">
          <el-input type="text" auto-complete="off" v-model="Form.path" placeholder="请填写菜单URL（父级为顶级时，可不填）"></el-input>
        </el-form-item>
         <el-form-item label="菜单icon" prop="icon">
          <el-input type="text" auto-complete="off" v-model="Form.icon" placeholder="请填写菜单icon（非必须）"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序" prop="order">
             <el-input type="text" auto-complete="off" v-model.number="Form.order" placeholder="请填写菜单排序(数字)"></el-input>
        </el-form-item>
        <el-form-item label="显示菜单" prop="show">
          <el-switch v-model="Form.show"></el-switch>
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
import MenuApi from '@/api/menu'
export default {
  name: 'MenuInsert',
  props: ['id'],
  data () {
    return {
      Form: {
        parentId: '',
        title: '',
        path: '',
        order: '',
        show: false
      },
      rules: {
        parentId: [
          { required: true, message: '请选择父级菜单', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请填写菜单名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请填写菜单URL', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '请填写菜单排序', trigger: 'blur' },
          { type: 'number', message: '请填写数字' }
        ]
      },
      titleArr: [],
      breadcrumb: true
    }
  },
  created () {
    this.getTitle()
  },
  computed: {
  },
  watch: {
    '$route': 'getTitle',
    id: {
      handler () {
        if (this.id) {
          this.getonelist()
          // this.getTitle()
        }
      },
      immediate: true
    },
    deep: true
  },
  methods: {
    submitForm () {
      this.$refs.Form.validate((res) => {
        if (res) {
          if (this.id) {
            this.MUpdate(this.Form, this.id)
            // console.log(this.Form)
          } else {
            this.Minsert(this.Form)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Minsert (mdata) {
      MenuApi.MenuInsert(mdata)
        .then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.$router.push({path: '/menu/index'})
          } else {
            this.$notify({
              title: '失败',
              message: res.data.message,
              type: 'error'
            })
          }
        })
    },
    MUpdate (mdata, id) {
      MenuApi.MenuUpdate(mdata, id)
        .then((res) => {
          if (res.data.status === 200) {
            this.$emit('closeModel')
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.$emit('initid')// 防止再次修改这条记录时数据不同步
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
    getTitle () {
      setTimeout(() => {
        this.$refs.Form.resetFields()
      }, 20)
      MenuApi.GetTitle()
        .then((res) => {
          // console.log(res)
          if (res.data.status === 200) {
            this.titleArr = res.data.TitleList
            // console.log(this.titleArr)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getonelist () {
      MenuApi.GetOneList(this.id)
        .then((res) => {
          if (res.data.status === 200) {
            this.Form.parentId = res.data.Onelist[0].parentId
            this.Form.title = res.data.Onelist[0].title
            this.Form.path = res.data.Onelist[0].path
            this.Form.icon = res.data.Onelist[0].icon
            this.Form.order = res.data.Onelist[0].order
            this.Form.show = res.data.Onelist[0].show
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
  }
}
</script>

<style lang="stylus" scoped>
  .el-row
    padding-top 22px
    border 1px solid #ebebeb
    border-radius 3px
    transition .2s
</style>