import * as types from '../mutation'
const state = {
  user_id: '',
  role_id: '',
  menu_list: []
}

const getters = {
  user_id: state => state.user_id,
  role_id: state => state.role_id,
  menu_list: state => state.menu_list

}

const mutations = {
  [types.SET_USERID] (state, obj) {
    state.user_id = obj
  },
  [types.GET_ROLEID] (state, data) {
    state.role_id = data
  },
  [types.GET_MENU_LIST] (state, data) {
    state.menu_list = data
  }
}

export default {
  state, mutations, getters
}