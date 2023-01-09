import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./common/common.css"
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./mock/mock"
import "@/router/guard"

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
