import request from '@/utils/request'
const roleindex = async () => {
  return request({
    url: 'role/index',
    method: 'get'
  })
}
const setrole = async (name, idarr) => {
  return request({
    url: 'role/insert',
    method: 'post',
    data: {name: name, id: idarr}
  })
}

const GetOneList = async (id) => {
  return request({
    url: 'role/index',
    method: 'post',
    data: {
      _id: id
    }
  })
}

const roleUpdate = async (obj, id) => {
  const data = obj
  return request({
    url: 'role/update/' + id,
    method: 'post',
    data
  })
}

const DelOnerole = async (id) => {
  return request({
    url: 'role/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}
export default { setrole, roleindex, GetOneList, roleUpdate, DelOnerole }