import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000, // request timeout
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

service.interceptors.request.use(config => {
  // 在发送请求之前做一些事情
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  // 对响应数据做点什么
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })
export default service