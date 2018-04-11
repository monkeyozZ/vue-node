<template>
<div class="menu_left">
<el-menu
  :collapse="isCollapse"
  :collapse-transition="false"
  :router="true">
  <el-menu-item index="/index">
    <svg-icon icon-class="index"></svg-icon>
    <span slot="title">首页</span>
  </el-menu-item>
  <el-submenu index="">
    <template slot="title">
      <svg-icon icon-class="Excel"></svg-icon>
      <span slot="title">Excel</span>
    </template>
      <el-menu-item index="/uploadexcel">上传Excel</el-menu-item>
      <el-menu-item index="1-4-2">导出Excel</el-menu-item>
  </el-submenu>
</el-menu>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'vmenu',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'isCollapse'
    })
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.menu_left
  height calc(100vh - 100px)
  border-right 1px solid #e6e6e6
  .el-menu
    border none
    .el-submenu__title
      padding 0 118px
    svg.svg-icon
      margin-right 16px
  .el-menu--collapse
    .el-submenu__title
      padding 0 20px
      text-align right
      svg.svg-icon
        margin-right 0
    .el-tooltip
      text-align center
      svg.svg-icon
        margin-right 0
.el-menu--inline .el-menu-item
  text-align center
</style>
