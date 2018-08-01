import Base from './BaseController'
import RoleModel from '../../models/admin/role'
class Power extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
    this.insert = this.insert.bind(this)
    this.getonelist = this.getonelist.bind(this)
  }

  async index (req, res, next) {
    let list = await RoleModel.find().lean()
    res.send({
      status: 200,
      rolelist: list
    })
  }
  async insert (req, res, next) {
    // console.log(req.body)
    try {
      if (Object.keys(req.body).length !== 0) {
        let result = await RoleModel.create(req.body)
        if (result) {
          res.send({
            status: 200,
            message: '角色添加成功'
          })
        } else {
          res.send({
            status: -200,
            message: '角色添加失败'
          })
        }
      }
    } catch (error) {
      res.send({
        status: -200,
        message: error.message
      })
    }
  }

  async getonelist (req, res, next) {
    let onelist = await RoleModel.find({ _id: req.body._id }).lean()
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

  async update (req, res, next) {
    const id = req.params.id
    const powerarr = req.body
    // console.log(powerarr, id)
    let result = await RoleModel.findByIdAndUpdate(id, powerarr)
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

  async delete (req, res, next) {
    let id = req.body._id
    const result = await RoleModel.remove({ _id: id })
    // console.log(result)
    if (parseInt(result.n) === 1) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    }
  }
}

export default new Power()