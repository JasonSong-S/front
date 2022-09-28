import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {  path:'/',
     name:'home',
    component:()=>import('../views/MyHome.vue')
  },
  {  path:'/about',
     name:'about',
    component:()=>import('../views/MyAbout.vue')
  },
  {  path:'*',
    component:()=>import('../views/NotFound.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



