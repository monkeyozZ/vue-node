<template>
  <div class="main">
    <el-container class="main_body">
      <el-header><v-header></v-header></el-header>
        <el-container>
          <el-aside> <v-menu></v-menu> </el-aside>
          <el-main>
           <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          </el-main>
        </el-container>
      <el-footer><v-footer></v-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import header from '@/components/common/header'
import footer from '@/components/common/footer'
import slider from '@/components/common/slider'
export default {
  name: 'index',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-menu': slider
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  border-bottom 1px solid #eee
.el-aside
  width auto!important
  height 100%
  box-sizing border-box
  .el-menu
    transition width .28s ease-in-out
    width 200px
  .el-menu--collapse
    transition width .28s ease-in-out
    width 60px
.path
  padding-bottom 20px
.el-footer
  border-top 1px solid #eee
</style>