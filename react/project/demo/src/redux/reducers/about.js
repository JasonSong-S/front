const initState = {name:"about",msg:"about的数据"}
const aboutReducer = (prevState=initState,action)=>{
    const {type,payload}=action
    if (type === "aboutChange"){
        return {...prevState,msg:payload}
    }else{
        return prevState
    }
}
export {aboutReducer}