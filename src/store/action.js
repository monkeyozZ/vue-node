import * as types from './mutation'
import loginApi from '../api/login'
export const Menutaggle = ({commit}, status) => {
  commit(types.MENU_TAGGLE, status)
}

export const Signin = async ({ commit }, LoginInfo) => {
  return loginApi.login(LoginInfo).then(res => {
    if (res.data.status === 200) {
      commit(types.USER_LOGIN, res.data._id)
      return res
    } else {
      return res
    }
  }).catch(err => {
    // console.log(err)
    return err
  })
}