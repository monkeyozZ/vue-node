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

const powerUpdate = async (obj, id) => {
  const data = obj
  return request({
    url: 'Power/update/' + id,
    method: 'post',
    data
  })
}

const GetOneList = async (id) => {
  return request({
    url: 'Power/index',
    method: 'post',
    data: {
      _id: id
    }
  })
}

const DelOnepower = async (id) => {
  return request({
    url: 'Power/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}

export default { insertpower, powerindex, powerUpdate, GetOneList, DelOnepower }
