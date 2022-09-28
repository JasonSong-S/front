import { getToken } from "@/utils/auth"
import router from "./index"
router.beforeEach((to,from,next)=>{
    //console.log("导航守卫触发了");
    const hasToken = getToken();
    if (hasToken){
        if (to.path == '/login'){
            next('/')
        }else{
            next()
        }
    }else{
        if (to.path == '/login'){
            next()
        }else{
            next('/login')
        }
    }
})

