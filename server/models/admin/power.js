import mongoose from 'mongoose'
const Schema = mongoose.Schema
const power = new Schema({
  title: String,
  path: String,
  version: String
})

const PowerManage = mongoose.model('priv_priv', power)
export default PowerManage