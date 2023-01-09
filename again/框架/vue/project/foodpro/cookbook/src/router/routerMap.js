export default [
    {
        path:"*",
        name:"NotFound",
        component:()=>import("@/views/NotFound")
    },
        {
          path: '/',
          name: 'home',
          component:()=>import('../views/HomeView.vue')
        },
        {
          path:"/detail",
          name:"detail",
          component:()=>import("../views/FoodDetail.vue")
        },
        {
            path:"/login",
            name:"Login",
            component:()=>import("@/views/LoginIn")
        },
        {
          path:"/personal",
          name:"Personal",
          component:()=>import("@/views/PersonalCenter")
        }
       
      
]