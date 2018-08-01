import request from '@/utils/request'

const checkname = async (name) => {
  return request({
    url: 'account/check',
    method: 'post',
    data: {name: name}
  })
}

const insertaccount = async (obj) => {
  return request({
    url: 'account/insert',
    method: 'post',
    data: obj
  })
}

const accountlist = async () => {
  return request({
    url: 'account/index',
    method: 'get'
  })
}

const roleindex = async () => {
  return request({
    url: 'role/index',
    method: 'get'
  })
}

const accountUpdate = async (obj, id) => {
  const data = obj
  return request({
    url: 'account/update/' + id,
    method: 'post',
    data
  })
}

const Delaccount = async (id) => {
  return request({
    url: 'account/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}
export default { checkname, insertaccount, accountlist, roleindex, accountUpdate, Delaccount }