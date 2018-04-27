<template>
  <el-table
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
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import powerApi from '@/api/power'
export default {
  data () {
    return {
      powerlist: []
    }
  },
  methods: {
    getpowerlist () {
      powerApi.powerindex().then((res) => {
        if (res.data.status === 200) {
          this.powerlist = res.data.powerlist
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  beforeMount () {
    this.getpowerlist()
  }
}
</script>