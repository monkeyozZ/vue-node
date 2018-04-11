import Base from "./BaseController";
import formidable from 'formidable'

class Login extends Base{
  constructor(){
    super()
    this.login = this.login.bind(this)
  }
  async login(req, res, next) {
    // console.log(req.body.username)
    if(req.body){
      res.send({
        status: 0,
        message: '登录成功'
      })
    }
    // const form = new formidable.IncomingForm();
    // form.parse(req, (err, fields, fiels) => {
    //   if (err) {
    //     console.log(err)
		// 		throw err
    //   }
    //   try{
    //     if(fields){
    //       console.log(fields)
    //     }
    //   }catch(err){
    //     console.log(err.message, err)
    //   }
    // })
  }
}

export default new Login();