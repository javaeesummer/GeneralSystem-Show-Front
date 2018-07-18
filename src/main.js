import Vue from 'vue'
import '@/plugins/vuetify/index'
import '@/plugins/axios/index'
import App from './App.vue'
import qs from 'qs'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 路由
import router from './router/index.js'
// 框架内的路由
import store from './store/index.js'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$qs=qs
Vue.prototype.$store=store
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
