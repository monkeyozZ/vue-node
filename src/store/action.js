import * as types from './mutation'
import loginApi from '../api/login'
import Auth from '../utils/auth'
export const Menutaggle = ({commit}, status) => {
  commit(types.MENU_TAGGLE, status)
}

export const Signin = async ({ commit }, LoginInfo) => {
  return loginApi.login(LoginInfo).then(res => {
    if (res.data.status === 200) {
      commit(types.SET_USERID, res.data._id)
      Auth.setUserId(res.data._id)
      return res
    } else {
      return res
    }
  }).catch(err => {
    // console.log(err)
    return err
  })
}

export const setId = ({ commit }, UserId) => {
  commit(types.SET_USERID, UserId)
}

export const setroleid = async ({ commit }, userid) => {
  await loginApi.getroleid(userid).then((response) => {
    commit(types.GET_ROLEID, response.data.roleId)
    Auth.setRoleId(response.data.roleId)
  })
}

export const GetMenuList = async ({ commit }, roleid) => {
  loginApi.getmenu(roleid).then(res => {
    if (res.data.status === 200) {
      commit(types.GET_MENU_LIST, res.data.menulist)
    }
  }).catch((err) => {
    return err
  })
}