import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由数据
import routes from './routes'
import Cookie from 'js-cookie'
Vue.use(VueRouter)

let router = new VueRouter({ routes: routes })

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // 验证当前路由所有的匹配中是否需要有登陆验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    console.log(from)
    if (Cookie.get("userId")&&from.name==="activity-index") {
      next();
    } else {
      next({
        name: 'index'
      })
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})
export default router
