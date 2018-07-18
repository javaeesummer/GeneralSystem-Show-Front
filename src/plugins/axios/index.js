import Vue from 'vue'
import { Message } from 'element-ui'
import axios from 'axios'

// 在这里对返回的数据进行处理
// 在这里添加你自己的逻辑
axios.interceptors.response.use(res => {
  if (res.data.success === true) {
    return res.data
  }else{
    return Promise.reject(res.data.message)
  }
  // if (res.data.code !== undefined) {
  //   if (res.data.success !== 0) {
  //     Message.error(res.data.msg)
  //     return Promise.reject(res.data.msg)
  //   } else {
  //     return res.data.data
  //   }
  // } else {
  //   return res.data
  // }
}, err => {
  return Promise.reject(err)
})
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = axios