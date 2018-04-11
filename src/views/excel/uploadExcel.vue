<template>
  <div class="app-container">
    <el-breadcrumb class="path">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Excel管理</el-breadcrumb-item>
      <el-breadcrumb-item>Excel上传</el-breadcrumb-item>
    </el-breadcrumb>
    <upload-excel-component @on-selected-file='selected'></upload-excel-component>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data () {
    return {
      tableData: [],
      tableHeader: [],
      arr: []
    }
  },
  methods: {
    selected (data) {
      this.tableData = data.results
      this.tableHeader = data.header
    }
  }
}
</script>
