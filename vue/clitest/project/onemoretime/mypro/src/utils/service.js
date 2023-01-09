import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth";
// 创建自己的 axios 实例
const service = axios.create({
    baseURL:"http://localhost:8081",
    timeout:5000

})

// 请求拦截器，每次请求都带上的东西
service.interceptors.request.use((config)=>{
    if (getToken()){
        config.headers.getToken=getToken()
    }
    return config
},()=>{
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})

// 响应拦截器
service.interceptors.response.use((res)=>{
    const result = res.data
    if (result.success){
        return result
    }else{
        Message({
            type:"error",
            message:result.message || "账户和密码不匹配"
        })
        return Promise.reject(new Error(result.message || "账号和密码不匹配"))
    }

},()=>{
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})


export default service