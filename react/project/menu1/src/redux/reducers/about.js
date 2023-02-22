const initState = {name:'about',msg:"about的数据"}
export function aboutReducer(prevState = initState,a){
    const {type,payload}=a
    if (type === "aboutChange"){
        return {...prevState,msg:payload}
    }else{
        return prevState
    }
}