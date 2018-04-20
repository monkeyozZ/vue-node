import mongoose from 'mongoose'
const Schema = mongoose.Schema
const signInfo = new Schema({
  userId: String,
  ipaddr: String,
  IPLocation: String,
  latitude: String,
  longitude: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const sign = mongoose.model('sys_hi_login', signInfo)

export default sign