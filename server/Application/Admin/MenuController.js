import Base from './BaseController'
import MenuManage from '../../models/admin/menumanage'
import PowerModel from '../../models/admin/power'

class Menu extends Base {
  constructor () {
    super()
    this.insert = this.insert.bind(this)
    this.index = this.index.bind(this)
    this.MenuDelete = this.MenuDelete.bind(this)
    this.del = this.del.bind(this)
  }
  async insert (req, res, next) {
    const menuarr = req.body
    const powerUrl = {
      'title': req.body.title + '权限',
      'path': req.body.path,
      'version': req.body.version
    }
    try {
      let result1 = await MenuManage.create(menuarr)
      let result2 = await PowerModel.create(powerUrl)
      if (result1 && result2) {
        res.send({
          status: 200,
          message: '菜单添加成功'
        })
      } else {
        res.send({
          status: -100,
          message: '菜单添加失败'
        })
      }
    } catch (err) {
      throw err
    }
  }

  async gettitle (req, res, next) {
    let list = await MenuManage.find({}, { title: 1 }).lean()
    try {
      if (list) {
        res.send({
          status: 200,
          TitleList: list
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getonelist (req, res, next) {
    let onelist = await MenuManage.find({_id: req.body._id}).lean()
    try {
      if (onelist) {
        res.send({
          status: 200,
          Onelist: onelist
        })
      }
    } catch (err) {

    }
  }

  async index (req, res, next) {
    const getlist = async (parentId = 0) => {
      let list = await MenuManage.find({ parentId: parentId }).lean().sort({ order: 1 })
      for (let i in list) {
        let obj = {}
        obj['title'] = list[i].title
        obj['show'] = list[i].show
        if (list[i].icon) {
          obj['icon'] = list[i].icon
        }
        list[i].meta = [obj]
        list[i].children = await getlist(list[i]._id)
      }
      return list
    }
    getlist().then((response) => {
      const delother = (arr) => {
        for (const key in arr) {
          this.del(arr[key], ['icon', 'show', 'order', 'parentId', 'version', '__v'])
          if (arr[key].children.legth !== 0) {
            delother(arr[key].children)
          }
        }
        return arr
      }
      res.send({
        status: 200,
        MenuTree: delother(response)
      })
    })
  }

  async MenuUpdate (req, res, next) {
    const id = req.params.id
    const menuarr = req.body
    let beforeUrl = ''
    const powerUrl = {
      'title': req.body.title + '权限',
      'path': req.body.path,
      'version': req.body.version
    }
    try {
      let result = await MenuManage.findById(id)
      if (result) {
        beforeUrl = result.path
      }
      let result1 = await MenuManage.findByIdAndUpdate(id, menuarr)
      let result2 = await PowerModel.update({ path: beforeUrl }, powerUrl)
      if (result1 && result2) {
        res.send({
          status: 200,
          message: '修改成功'
        })
      } else {
        res.send({
          status: -200,
          message: '修改失败'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async MenuDelete (req, res, next) {
    const id = req.body._id
    let idArr = []
    let pathArr = []
    try {
      let CurrentId = await MenuManage.findById(id)
      idArr.push(CurrentId._id)
      const GetDelId = async (id) => {
        let haschildren = await MenuManage.find({ parentId: id })
        if (haschildren.length !== 0) {
          idArr.push(haschildren[0]._id)
          let childId = haschildren[0]._id
          await GetDelId(childId)
        }
        return idArr
      }
      const Deltree = async (arr) => {
        let result = []
        for (let i in arr) {
          result[i] = await MenuManage.remove({_id: arr[i]})
        }
        return result
      }
      const Delpowertree = async (arr) => {
        let result = []
        for (let i in arr) {
          result[i] = await PowerModel.remove({ path: arr[i] })
        }
        return result
      }

      const FindDelPowerArr = async (arr) => {
        for (let i in arr) {
          let onepower = await MenuManage.findById(arr[i])
          pathArr[i] = onepower.path
        }
        return pathArr
      }
      await GetDelId(CurrentId._id).then(async (response) => {
        if (response.length !== 0) {
          let lastres1 = await FindDelPowerArr(response).then((response1) => {
            return Delpowertree(response1).then((response3) => {
              return response3.every((item, index, array) => {
                console.log(item)
                return (parseInt(item.n) === 1)
              })
            })
          })
          let lastres2 = await Deltree(response).then((response4) => {
            return response4.every((item, index, array) => {
              return (parseInt(item.n) === 1)
            })

            // console.log(result)
          })
          // console.log('1:' + lastres1, '2:' + lastres2)
          if (lastres1 && lastres2) {
            res.send({
              status: 200,
              message: '删除成功'
            })
          } else {
            res.send({
              status: -200,
              message: '删除失败'
            })
          }
        }
      }).catch((err) => {
        console.log(err)
      })
      // console.log(lastres1)
    } catch (err) {
      res.send({
        status: -200,
        message: err
      })
      console.log(err)
    }
  }

  del (obj, keys) {
    keys.map((key) => {
      delete obj[key]
    })
    return obj
  }
}
export default new Menu()