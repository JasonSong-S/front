import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import("../views/MyHome.vue")
  },
  {
    path: '/detail',
    component: () => import("../views/FoodDetail.vue")
  },

]

const router = new VueRouter({
  mode: 'history',

  routes
})

export default router
