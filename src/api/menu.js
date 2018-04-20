import request from '@/utils/request'
const MenuInsert = async (obj) => {
  const data = obj
  return request({
    url: 'menu/insert',
    method: 'post',
    data
  })
}
export default { MenuInsert }