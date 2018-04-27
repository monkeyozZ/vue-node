import Base from './BaseController'
import PowerModel from '../../models/admin/power'
class Power extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
  }

  async index (req, res, next) {
    let result = await PowerModel.find()
    if (result) {
      res.send({
        status: 200,
        powerlist: result
      })
    }
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
}

export default new Power()