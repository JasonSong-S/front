const initState = 0
export default function myReducer(prevState =initState,action){
    const {type,payload}=action
    if (type == "add"){
        return prevState + payload
    }else if (type == "minus"){
        return prevState - payload
    }else{
        return prevState
    }
}