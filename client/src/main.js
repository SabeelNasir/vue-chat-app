import Vue from 'vue'
import App from './App.vue'

import VueBootstrap from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueBootstrap)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
