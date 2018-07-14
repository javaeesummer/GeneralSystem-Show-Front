import Vue from 'vue'
import './plugins/vuetify/index'
import App from './App.vue'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 路由
import router from './router/index.js'
// 框架内的路由
import store from './store/index.js'
Vue.use(ElementUI)
console.log(router);
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
