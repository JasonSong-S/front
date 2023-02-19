import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function MyHome() {

    const [searchText, setSearchText] = useState("")
    const [list, setList] = useState([])
    const [kind, setKind] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/class",
            {
                params: {
                appkey: "c671a4c29ec3381b"
                }
            }).then((res) => {
                let result = res.data.result
                console.log(res);
                // setList(result)

                // setKind(result[10].list.slice(0, 10))

            })
    })

    let search = () => {
        console.log(searchText);
    }

    let handleList = (i) => {
        console.log(i);
    }

    let handleKind = (i) => {
        console.log(i);
    }
    return (
        <div>
            <input type="text" placeholder='请输入想吃的菜' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            <button onClick={search}>搜索</button>
            <div >{list.map((item, index) => <li key={index} onClick={(index) => { handleList(index) }} style={{ listStyle: "none", background: "cyan", display: "inline-block", marginRight: "20px" }}>{item.name}</li>)}</div>
            <div>{kind.map((item, index) => <li key={index} onClick={(index) => { handleKind(index) }} style={{ listStyle: "none", background: "yellowGreen", display: "inline-block", marginRight: "20px", marginTop: "20px" }}>{item.name}</li>)}</div>
        </div>
    )

    
}
