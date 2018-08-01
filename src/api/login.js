import request from '@/utils/request'
const login = async (obj) => {
  const data = obj
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

const getroleid = async (userid) => {
  return request({
    url: 'Power/roleid',
    method: 'post',
    data: { _id: userid }
  })
}

const getmenu = async (roleid) => {
  return request({
    url: 'Power/routelist',
    method: 'post',
    data: { roleid: roleid }
  })
}

export default { login, getmenu, getroleid }