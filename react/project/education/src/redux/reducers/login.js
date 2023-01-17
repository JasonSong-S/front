// 获取登录用户的权限的别名
const initState = {role:"",nickname:""}
export  function loginReducer(prevState = initState,action){
    const {type,payload} =action
    if (type == "add"){
        return payload
    }else{
        return prevState
    }
}

// 获取各个角色的菜单项
const menu = []
export function menuReducer(prevState = menu,action){
    const {type,payload} =action
    if (type == "create"){
        return payload
    }else{
        return prevState
    }
}

