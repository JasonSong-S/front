import React, { useState,useEffect } from 'react'
import axios from 'axios'

export default function MyHome() {

    const [searchText, setSearchText] = useState("")
    const [list, setList] = useState([])
    const [kind, setKind] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3001/class",
            {
                params:{
                appkey: "c671a4c29ec3381b"
            }
        }).then((res)=>{
            let result = res.data.result
            setList(result)
            
            setKind(result[10].list.slice(0,10))

        })
    })

    let search = () => {
        console.log(searchText);
    }

    let handleList = (e,i)=>{
        console.log(e,i);
    }

    let handleKind = (e,i)=>{
        console.log(e,i);
    }
    return (
        <div>
            <input type="text" placeholder='请输入想吃的菜' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            <button onClick={search}>搜索</button>
            <div >{list.map((item,index)=><li key={index} onClick={(e,index)=>{handleList(e,index)}}  style={{listStyle:"none", background:"cyan",display:"inline-block",marginRight:"20px"}}>{item.name}</li>)}</div>
            <div>{kind.map((item,index)=><li key={index} onClick={(e,index)=>{handleKind(e,index)} } style={{listStyle:"none", background:"yellowGreen",display:"inline-block",marginRight:"20px",marginTop:"20px"}}>{item.name}</li>)}</div>
        </div>
    )
}
