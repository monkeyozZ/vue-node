<template>
<div>
  <el-breadcrumb class="path" v-show="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    v-loading="loading"
    :data="powerlist"
    border>
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="权限名称"
      prop="title"
      >
    </el-table-column>
    <el-table-column
      label="权限URL"
      prop="path"
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
  <el-dialog title="修改权限" :visible.sync="dialogFormVisible" @close="remove">
      <v-edit :id="id" @initid="initid" @initdata="getpowerlist" ref="reset" v-on:closeModel="closemodel"></v-edit>
  </el-dialog>
</div>
</template>

<script>
import powerApi from '@/api/power'
import edit from './insert'
export default {
  components: {
    'v-edit': edit
  },
  data () {
    return {
      breadcrumb: true,
      powerlist: [],
      loading: false,
      dialogFormVisible: false,
      id: '',
      isdel: false
    }
  },
  methods: {
    getpowerlist () {
      this.loading = true
      powerApi.powerindex().then((res) => {
        if (res.data.status === 200) {
          this.powerlist = res.data.powerlist
          this.loading = false
        }
      })
    },
    handleEdit (powerid) {
      this.dialogFormVisible = true
      this.id = powerid
    },
    handleDelete (powerid) {
      this.$confirm('确定要删除该权限吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        powerApi.DelOnepower(powerid)
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
  watch: {
    '$route': 'getpowerlist',
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
    'isdel': 'getpowerlist'
  },
  mounted () {
    this.getpowerlist()
  }
}
</script>