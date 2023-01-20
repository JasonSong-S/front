import service from "../utils/request"
// 登录接口
export function login(data){
    return service({
        url:"/user/login",
        method:"post",
        data
    })
}

// 根据 token 再去获取用户的信息
export function getInfo(){
    return service({
        url:"/user/getInfo",
        method:"get",
    })
}