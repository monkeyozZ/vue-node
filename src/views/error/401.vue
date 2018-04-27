<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如果觉得贼没面子，请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/index">回首页</router-link>
          </li>
          <li class="link-type"><a href="https://www.taobao.com/">随便看看</a></li>
          <li><a @click.prevent="dialogVisible=true" href="#">点我看图</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog title="随便看" :visible.sync="dialogVisible">
      <img class="pan-img" :src="ewizardClap">
    </el-dialog>
     <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'page401',
  data () {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/index' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .errPage-container
    width 800px
    margin 100px auto
    .pan-back-btn
      background #008489
      color #fff
    .pan-gif
      margin 0 auto
      display block
    .pan-img
      display block
      margin 0 auto
      width 100%
    .text-jumbo
      font-size 60px
      font-weight 700
      color #484848
    h2
      line-height 34px
      margin-top 20px
    h6
      margin-bottom 20px
    .list-unstyled
      font-size 14px
      li
        padding-bottom 8px
      a
        color #008489
        text-decoration none
        &:hover
          text-decoration: underline
</style>
