const initState = {name:'about',msg:"about的数据"}
export function aboutReducer(prevState = initState,action){
    const {type,payload}=action
    if (type === "aboutChange"){
        return {...prevState,msg:payload}
    }else{
        return prevState
    }
}