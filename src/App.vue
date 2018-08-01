<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import index from '@/views/main/index'
export default {
  name: 'App',
  components: {
    'v-index': index
  },
  methods: {
    redirect () {

    }
  },
  watch: {
    '$route': 'redirect'
  }
}
</script>

<style lang="stylus" scoped>

</style>