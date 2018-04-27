<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {mapActions} from 'vuex'
import index from '@/views/main/index'
export default {
  name: 'App',
  components: {
    'v-index': index
  },
  methods: {
    ...mapActions({
      setId: 'setId',
      GetMenuList: 'GetMenuList'
    })
  },
  beforeMount () {
    let UserID = Cookies.get('UserId')
    if (UserID) {
      this.setId(UserID)
      this.GetMenuList(UserID)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>