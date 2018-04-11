import * as types from '../mutation'
const state = {
  isCollapse: false
}

const getters = {
  isCollapse: state => state.isCollapse
}

const mutations = {
  [types.MENU_TAGGLE] (state, status) {
    state.isCollapse = status
  }
}

export default {
  state, mutations, getters
}