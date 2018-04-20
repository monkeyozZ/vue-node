import Base from './BaseController'
import MenuManage from '../../models/admin/menumanage'

class Menu extends Base {
  constructor () {
    super()
    this.insert = this.insert.bind(this)
    this.index = this.index.bind(this)
  }
  async insert (req, res, next) {
    const menuarr = req.body
    try {
      const result = await MenuManage.create(menuarr)
      if (result) {
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

  async index (req, res, next) {
    let list = await MenuManage.find({parentId: 0}).sort({order: 1})
    try {
      if (list) {
        list.map((item) => {
          let obj = {}
          obj['title'] = item.title
          obj['show'] = item.show
          if (item.icon) {
            obj['icon'] = item.icon
          }
          item.meta = [obj]
          // this.del(item, ['title', 'icon', 'show', 'order', 'parentId', '_id'])
          item.children = MenuManage.find({ parentId: item._id }).sort({ order: 1 })
          // console.log(item.children)
        })
        res.send(list[0].children)
      }
    } catch (err) {
      throw err
    }
  }

  /* del (obj, keys) {
    keys.map((key) => {
      delete obj[key]
    })
    return obj
  } */
}

export default new Menu()