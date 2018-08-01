import Base from './BaseController'
import MenuManage from '../../models/admin/menumanage'
import PowerModel from '../../models/admin/power'
import RoleModel from '../../models/admin/role'
import AdminModel from '../../models/admin/admin'
class Power extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.getonelist = this.getonelist.bind(this)
    this.delete = this.delete.bind(this)
    this.routelist = this.routelist.bind(this)
    this.del = this.del.bind(this)
  }

  async index (req, res, next) {
    let list = await PowerModel.find().lean()
    res.send({
      status: 200,
      powerlist: list
    })
  }

  async insert (req, res, next) {
    const PowerObj = req.body
    // console.log(PowerObj)
    try {
      if (Object.keys(PowerObj).length !== 0) {
        let result = await PowerModel.create(PowerObj)
        if (result) {
          res.send({
            status: 200,
            message: '权限添加成功'
          })
        } else {
          res.send({
            status: -200,
            message: '权限添加失败'
          })
        }
      }
    } catch (err) {
      res.send({
        status: -200,
        message: err.message
      })
    }
  }

  async update (req, res, next) {
    const id = req.params.id
    const powerarr = req.body
    console.log(powerarr)
    let result = await PowerModel.findByIdAndUpdate(id, powerarr)
    if (result) {
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
  }

  async getonelist (req, res, next) {
    let onelist = await PowerModel.find({ _id: req.body._id }).lean()
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

  async delete (req, res, next) {
    let id = req.body._id
    const result = await PowerModel.remove({ _id: id })
    // console.log(result)
    if (parseInt(result.n) === 1) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    }
  }

  async roleid (req, res, next) {
    let userid = req.body._id
    let result = await AdminModel.findById(userid).lean()
    if (result) {
      res.send({
        status: 200,
        roleId: result.roleId
      })
    }
  }

  async routelist (req, res, next) {
    let roleId = req.body.roleid
    let powerlist = await PowerModel.find().lean()
    let haspowerlist = []
    const getlist = async (parentId = 0) => {
      let list = await MenuManage.find({ parentId: parentId }).lean().sort({ order: 1 })
      for (let i in list) {
        let obj = {}
        obj['title'] = list[i].title
        obj['show'] = list[i].show
        if (list[i].icon) {
          obj['icon'] = list[i].icon
        }
        list[i].meta = obj
        list[i].children = await getlist(list[i]._id)
      }
      return list
    }
    let Menulist = await getlist().then((response) => {
      const delother = (arr) => {
        for (const key in arr) {
          this.del(arr[key], ['icon', 'show', 'order', 'parentId', 'version', '__v', 'title', '_id'])
          if (arr[key].children.legth !== 0) {
            delother(arr[key].children)
          }
        }
        return arr
      }
      return delother(response)
    })
    let [...routelist] = Menulist
    // console.log(Menulist)
    let role = await RoleModel.findById(roleId)
    if (role) {
      let rolearr = role.id.split(',')
      for (let i = 0; i < rolearr.length; i++) {
        let roleitem = await PowerModel.find({ title: rolearr[i] })
        haspowerlist.push(roleitem[0])
      }
      for (let i = 0; i < powerlist.length; i++) {
        for (let j = 0; j < haspowerlist.length; j++) {
          if (haspowerlist[j].path === powerlist[i].path) {
            powerlist.splice(i, 1)
          }
        }
      }
      // console.log(powerlist)
    }
    if (Menulist && powerlist) {
      for (let i = 0; i < Menulist.length; i++) {
        for (let j = 0; j < powerlist.length; j++) {
          if (powerlist[j].path === Menulist[i].path) {
            routelist.splice(i, 1)
          }
        }
        if (Menulist[i].children.length !== 0) {
          for (let k = 0; k < Menulist[i].children.length; k++) {
            for (let j = 0; j < powerlist.length; j++) {
              if (Menulist[i].children[k].path === powerlist[j].path) {
                routelist[i].children.splice(k, 1)
                // console.log(routelist[i].children)
                k = k - 1
              }
            }
          }
        }
      }
      // console.log(routelist)
      res.send({
        status: 200,
        menulist: routelist
      })
    }
  }

  del (obj, keys) {
    keys.map((key) => {
      delete obj[key]
    })
    return obj
  }
}

export default new Power()