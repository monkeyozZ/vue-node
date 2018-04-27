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

const MenuManage = mongoose.model('priv_menu', menu)
export default MenuManage