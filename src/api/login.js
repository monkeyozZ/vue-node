import request from '@/utils/request'
const login = async (obj) => {
  const data = obj
  return request({
    url: 'login',
    method: 'post',
    data
  })
}
export default { login }