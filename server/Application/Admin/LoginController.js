import Base from './BaseController'
import md5 from 'md5'
import Adminmodel from '../../models/admin/admin'
import signInfomodel from '../../models/admin/signInfo'
// import formidable from 'formidable'

class Login extends Base {
  constructor () {
    super()
    this.login = this.login.bind(this)
  }
  async login (req, res, next) {
    try {
      if (Object.keys(req.body).length !== 0) {
        const username = req.body.username
        const password = req.body.password
        // console.log(req.body)
        if (username) {
          let result = await Adminmodel.findOne({username})
          if (result) {
            if (md5(password) === result.password) {
              const signInfo = {
                userId: result._id,
                ipaddr: req.body['ipObj[cip]'],
                IPLocation: req.body['ipObj[cname]']
              }
              try {
                signInfomodel.create(signInfo)
              } catch (err) {
                res.send({
                  status: -300,
                  message: err.message
                })
              }
              req.session.user_id = result._id
              res.send({
                status: 200,
                _id: result._id,
                message: '登录成功'
              })
            } else {
              res.send({
                status: -100,
                message: '用户名或密码错误'
              })
            }
          } else {
            res.send({
              status: -200,
              message: '用户名或密码错误'
            })
          }
        }
      }
    } catch (err) {
      console.log(err.message, err)
      res.send({
        status: -300,
        message: err.message
      })
    }
  }

  async register (req, res, next) {

  }
}

export default new Login()