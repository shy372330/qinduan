import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Router)
Vue.use(ElementUI)
const router = new Router({
  mode: 'history',
  routes
});

/*router.beforeEach((to, from, next) => {
 if (sessionStorage.getItem("user")!=null){
   next()
 }

})*/

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
