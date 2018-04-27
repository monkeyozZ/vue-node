import request from '@/utils/request'
const login = async (obj) => {
  const data = obj
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

const getmenu = async (userid) => {
  return request({
    url: 'Power/index',
    method: 'post',
    data: {_id: userid}
  })
}
export default { login, getmenu }