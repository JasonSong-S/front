import React, { Component } from 'react'
import { Route,Link } from 'react-router-dom';

function First(){
  return (
    <h1>我是 home 的首页</h1>
  )
}

function Consult(){
  return (
    <h1>我是 home 的资讯页</h1>
  )
}
export default class Home extends Component {
  render() {
    console.log("home",this.props);
    const {match} = this.props
    const url = match.url
    return (
      <div>
        
        我是Home组件
        <Link to={`${url}/first`}>home的首页</Link>
        <Link to={`${url}/consult`}>home的资讯页</Link>
        <Route path={`${url}/first`} render={()=><div>
          <h1>我是 first 中的 render 方式写的</h1>
          <First></First>
        </div>}></Route>
        <Route path={`${url}/consult`}  render={()=>(
          <div>
            <h1>我是 consult 中使用 render 写的</h1>
            <Consult></Consult>
          </div>
        )}></Route>
        
        
        </div>
    )
  }
}
