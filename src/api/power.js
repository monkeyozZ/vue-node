import request from '@/utils/request'
const insertpower = async (PowerObj) => {
  return request({
    url: 'Power/insert',
    method: 'post',
    data: PowerObj
  })
}

const powerindex = async () => {
  return request({
    url: 'Power/index',
    method: 'get'
  })
}
export default { insertpower, powerindex }