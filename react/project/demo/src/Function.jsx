import React,{useState,useEffect} from 'react'



export default function Function() {
    const [count,setCount] = useState(0)
    useEffect(()=>{
        document.title = `你点击了 ${count} 次`
        console.log(22);
        return (()=>{
            console.log(3333);
        })
    })
    return (
     <div>
        
        <button onClick={()=>setCount(count+1)}>点击</button>
     </div>   
    )
}
