import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import Menutaggle from './modules/header_menu_taggle'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    Menutaggle
  }
})