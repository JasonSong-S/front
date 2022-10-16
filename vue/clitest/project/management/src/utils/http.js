// 封装 get 和 post 请求
import service from "./service";
// get 请求
export function get(url,params){
    const config = {
        url,
        method:"get"
    }
    if(params){
        config.params = params
    }
    return service(config)
}

// post 请求
export function post(url,params){
    const config = {
        url,
        method:"post"
    }
    if (params){
        config.data = params
    }
    return service(config)
}