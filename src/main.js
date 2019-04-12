// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import config from '@/config'

Vue.config.productionTip = false

axios.defaults.baseURL = config.apiPrefix
Vue.prototype.$axios = axios

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
  return null
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
