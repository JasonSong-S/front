import service from "../utils/request"
// 登录接口
export function login(data){
   return service({
        url:"/user/login",
        method:"post",
        data
    })
}