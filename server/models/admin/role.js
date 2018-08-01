import mongoose from 'mongoose'
const Schema = mongoose.Schema
const role = new Schema({
  name: String,
  id: String
})

const RoleManage = mongoose.model('role', role)
export default RoleManage