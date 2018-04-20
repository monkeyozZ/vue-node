import * as types from '../mutation'
const state = {
  user_info: {}
}

const getters = {
  user_info: state => state.user_info
}

const mutations = {
  [types.USER_LOGIN] (state, obj) {
    state.user_info = obj
  }
}

export default {
  state, mutations, getters
}