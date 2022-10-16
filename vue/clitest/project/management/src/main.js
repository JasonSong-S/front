import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./common/reset.css"
import "./common/rule.css"
import "./mock/mock"
import "@/router/guard"

Vue.use(ElementUI);
Vue.config.productionTip = false  // 关闭生产环境的错误提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
