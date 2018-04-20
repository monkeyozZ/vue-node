<template>
  <div>
   <el-breadcrumb class="path">
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
              <el-option label="区域二" value="1"></el-option>
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
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.Form.validate((res) => {
        if (res) {
          MenuApi.MenuInsert(this.Form).then((res) => {
            if (res.data.status === 200) {
              this.$notify({
                title: '成功',
                message: res.data.message,
                type: 'success'
              })
              this.$router.push({path: '/menu/index'})
              this.$refs.Form.resetFields()
            } else {
              this.$notify({
                title: '失败',
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>