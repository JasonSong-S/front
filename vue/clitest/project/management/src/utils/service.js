import axios from "axios"
import { Message } from 'element-ui';
import { getToken } from "./auth";
// 根据自己的需求自己创建一个 axios 实例，而不是使用原装的 axios
const service = axios.create({
    baseURL:"http://localhost:8080",
    timeout:5000
})


// 请求拦截器(每次请求都带上的东西，就在请求拦截器里面携带，比如这里的 token)，请求拦截器中如果没有使用 return 返回，那么不会继续进行下面的步骤
service.interceptors.request.use((config)=>{
    // 登录的时候没有 token, 其他时候都有 token
    if (getToken()){
        config.headers.getToken = getToken()
    }
    return config
},()=>{
    Message({
        type:"error",
        message:"请求错误" 
    })
    return Promise.reject(new Error("请求错误" ))
})



// 响应拦截器(每次从服务器端返回，在客户端之前做得操作)
service.interceptors.response.use((res)=>{
    const result = res.data
    if (result.success){
        return result
    }else{
        Message({
            type:"error",
            message:result.message || "账号和密码不匹配" 
        })
        return Promise.reject(new Error(result.message || "账号和密码不匹配"))
    }
},()=>{
    Message({
        type:"error",
        message:"请求错误" 
    })
    return Promise.reject(new Error("请求错误" ))
})



// 默认导出 service，(每一个 js 文件中只能有一个默认导出)
export default service