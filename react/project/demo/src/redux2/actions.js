import store from "./store";
export const createAction = (data,ms)=>{
    return function(){
        setTimeout(function(){
            store.dispatch({
                type:"add",
                payload:data
            })
        },ms)
    }
}