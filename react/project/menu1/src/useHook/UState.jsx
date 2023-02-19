import React, {useState,useEffect} from "react"

function UState(props){
    let  [count,setCount] =useState(0)
    useEffect(()=>{document.title = `您点击了${count}次`})

    return (
        <div>
            <p>您点击了{count}次</p>
            <button onClick={()=>setCount(count++)}>点击</button>
            
        </div>
    )
}

export default UState