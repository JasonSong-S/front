import React, {useRef} from 'react'


export default function Refs(props){
    const myref = useRef()
        const change = ()=>{
            console.log(myref)
        }
        return (
            <div ref={myref} onClick={change}>hello jason</div>
        )
}