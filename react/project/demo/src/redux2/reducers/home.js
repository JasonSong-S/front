

const initState = {name:"home",msg:"home的数据"}
export const homeReducer2 =(prevState=initState,action)=>{
    const {type,payload}=action
    if (type ==="homeChange"){
        return {...prevState,msg:payload}
    }else{
        return prevState
    }
}