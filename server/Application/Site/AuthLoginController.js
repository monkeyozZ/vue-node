import Base from './BaseController'
var request = require('request')
class AuthLogin extends Base {
  constructor () {
    super()
    this.gettoken = this.gettoken.bind(this)
    this.getlongtimetoken = this.getlongtimetoken.bind(this)
    this.getuserinfo = this.getuserinfo.bind(this)
  }
  async index (req, res, next) {
    console.log(req.session)
    res.send(req.session.userinfo)
  }
  async gettoken (req, res, next) {
    await request.get(
      {
        url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx83b956b6493bef90&secret=f3d1c96c2f8631a5baf0369cea29a2d9&code=' + req.query.code + '&grant_type=authorization_code'
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body)
          let refreshToren = data.refresh_token
          this.getlongtimetoken(refreshToren, (response) => {
            let data2 = JSON.parse(response)
            let accesstoken = data2.access_token
            let openid = data2.openid
            this.getuserinfo(accesstoken, openid, (response) => {
              req.session.userinfo = response
              console.log(req.session)
              res.send(response)
            })
          })
        } else {
          console.log(error)
        }
      })
  }

  async getlongtimetoken (refreshToren, callback) {
    await request.get(
      {
        url: 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx83b956b6493bef90&grant_type=refresh_token&refresh_token=' + refreshToren
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body)
          callback(body)
        } else {
          callback(error)
        }
      }
    )
  }

  async getuserinfo (accesstoken, openid, callback) {
    await request.get(
      {
        url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accesstoken + '&openid=' + openid + '&lang=zh_CN'
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(body)
        } else {
          callback(error)
        }
      }
    )
  }
}

export default new AuthLogin()