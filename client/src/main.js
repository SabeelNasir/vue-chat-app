import Vue from 'vue'
import App from './App.vue'

import VueBootstrap from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import config from './config/config'

import store from './store'
import router from './router'

Vue.use(VueBootstrap)
Vue.config.productionTip = false
Vue.use(config)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
