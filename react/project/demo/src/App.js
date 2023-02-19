import React, { Component,useEffect,useState } from 'react'
import Home from "./components/home/Index"
import About from "./components/about/Index"
import Home2 from "./components2/home/Index"
import About2 from "./components2/about/Index"
import TestLifeCycle from './TestLifeCycle';
import Function from './Function';
import Refs from "./Refs"
import "./App.css"
import store from './redux2/store';
import { createAction } from './redux2/actions';


function Login(props){
  console.log(222,store.getState());
  const [a,setA]=useState(0)

  useEffect(()=>{
    store.subscribe(()=>{
      setA(a+1)
    })
  })

  let add=()=>{
    store.dispatch(createAction(30,5))
  }
  return (
    <div>
      <h1>{store.getState()}</h1>
      <button onClick={add}>点击增加</button>
    </div>
  )
}

export default class App extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div>
        <div>
          <p>我是 App 组件</p>
          <Home />
          <About />
          <TestLifeCycle />
          <Function />
          <Refs />
        </div>
        <div className='another'>
          <Login />
          <Home2></Home2>
          <About2></About2>
        </div>
      </div>
    )
  }
}
