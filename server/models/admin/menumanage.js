import mongoose from 'mongoose'
const Schema = mongoose.Schema
const menu = new Schema({
  title: String,
  parentId: String,
  path: String,
  icon: String,
  version: {type: String, default: '1.0.0'},
  show: Boolean,
  order: Number,
  meta: Array,
  children: Array
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const sign = mongoose.model('priv_menu', menu)

export default sign