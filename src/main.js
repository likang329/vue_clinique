// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import API_PROXY from '../static/js/http'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'


// 重新设置请求头
function transformRequest (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}	

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  config.data = transformRequest(config.data)
  return config
}, function (err) {
  return Promise.reject(err)
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

var app = new Vue({
   router: router  //一般简写成 router
}).$mount('#app')

Vue.use(MuseUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})