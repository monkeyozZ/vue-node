import request from '@/utils/request'
const MenuInsert = async (obj) => {
  const data = obj
  return request({
    url: 'menu/insert',
    method: 'post',
    data
  })
}

const GetTitle = async () => {
  return request({
    url: 'menu/insert',
    method: 'get'
  })
}

const GetMenuList = async () => {
  return request({
    url: 'menu/index',
    method: 'get'
  })
}

const GetOneList = async (id) => {
  return request({
    url: 'menu/index',
    method: 'post',
    data: {
      _id: id
    }
  })
}

const MenuUpdate = async (obj, id) => {
  const data = obj
  return request({
    url: 'menu/update/' + id,
    method: 'post',
    data
  })
}

const DelOneMenu = async (id) => {
  return request({
    url: 'menu/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}
export default { MenuInsert, GetTitle, GetMenuList, GetOneList, MenuUpdate, DelOneMenu }