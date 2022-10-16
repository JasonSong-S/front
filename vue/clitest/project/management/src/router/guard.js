import router from "./index"
import {getToken} from "@/utils/auth"
import asyncRoutes from "./asyncRouterMap"
import store from "@/store"
// 导航守卫
router.beforeEach(async (to,from,next)=>{
    console.log("导航守卫触发了");
    const hasToken = getToken()
    if (hasToken){
        await store.dispatch("getRole")
        if (to.path == "/login"){
            next("/")
        }else{
            // 动态添加路由，如果有需要访问权限的路由，再在这里添加
            if (to.name == null){
                // 添加路由
                let role = asyncRoutes.filter(item=>item.meta.auth.includes(store.state.role))
                for (let i = 0; i < role.length;i++){
                    router.addRoute(role[i]);
                }
                
                  // 跳转
                  // 因为上面添加路由是一个异步的过程，所以 next() 一定会先于上面的添加路由执行
                  // 所以 next() 中的操作是反复执行的过程，因为如果找不到对应的路由的话就会重复执行，直到找到，那么就会执行 else
                  next({...to,replace:true})
            }else{
                next()
            }
            
        }
    }else{
        if (to.path =="/login"){
            next()
        }else{
            next("/login")
        }
    
    }
    
})

