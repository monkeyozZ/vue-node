import Base from './BaseController'
import AdminModel from '../../models/admin/admin'
import md5 from 'md5'
class Account extends Base {
  constructor () {
    super()
    this.checkname = this.checkname.bind(this)
    this.insert = this.insert.bind(this)
  }

  async checkname (req, res, next) {
    let username = req.body.name
    AdminModel.findOne({ username: username }).then((response) => {
      if (response !== null) {
        res.send({
          status: -200,
          message: '用户名已存在'
        })
      } else {
        res.send({
          status: 200,
          message: '用户名可使用'
        })
      }
    })
  }

  async insert (req, res, next) {
    let obj = {
      username: req.body.username,
      password: md5(req.body.password),
      roleId: req.body.roleId,
      roleName: req.body.rolename,
      registerTime: Date.now()
    }
    try {
      let result = await AdminModel.create(obj)
      if (result) {
        res.send({
          status: 200,
          message: '账号添加成功'
        })
      } else {
        res.send({
          status: -200,
          message: '账号添加失败'
        })
      }
    } catch (error) {
      res.send({
        status: -200,
        message: error.message
      })
    }
  }

  async index (req, res, next) {
    let list = await AdminModel.find().lean()
    res.send({
      status: 200,
      accountlist: list
    })
  }

  async update (req, res, next) {
    const id = req.params.id
    const powerarr = req.body
    // console.log(powerarr, id)
    let result = await AdminModel.findByIdAndUpdate(id, powerarr)
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
    const result = await AdminModel.remove({ _id: id })
    // console.log(result)
    if (parseInt(result.n) === 1) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    }
  }
}

export default new Account()