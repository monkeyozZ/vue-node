import * as types from '../mutation'
const state = {
  user_id: null,
  menu_list: []
}

const getters = {
  user_id: state => state.user_id,
  menu_list: state => state.menu_list

}

const mutations = {
  [types.SET_USERID] (state, obj) {
    state.user_id = obj
  },
  [types.GET_MENU_LIST] (state, data) {
    state.menu_list = data
  }
}

export default {
  state, mutations, getters
}