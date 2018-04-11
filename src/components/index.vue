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
import menu from '@/components/common/menu'
export default {
  name: 'index',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-menu': menu
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.el-aside
  width auto!important
.path
  padding-bottom 20px
</style>