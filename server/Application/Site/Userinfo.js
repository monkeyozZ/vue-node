import Base from './BaseController'
class Userinfo extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
  }
  async index (req, res, next) {
    console.log(req.session)
    res.send(req.session)
  }
}
export default new Userinfo()