import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userInfo = new Schema({
  username: String,
  password: String,
  mobile: String,
  status: Number,
  roleId: String,
  roleName: String,
  currentLogin: String,
  headImgSrc: String,
  workEmail: String,
  registerTime: Date,
  updateTime: { type: Date, default: Date.now }
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const admin = mongoose.model('priv_sys_user', userInfo)

export default admin