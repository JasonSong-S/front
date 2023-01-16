import React, { Component } from 'react'
import Home from "./components/home/Index"
import HomeConsult from "./components/home/Consult"
import About from "./components/about/Index"
import {Route,Link,BrowserRouter,Switch}  from "react-router-dom"
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>App 组件</h1>
        <BrowserRouter>
          <Link to={{pathname:"/home",state:{name:"jason",age:28}}}>home 页面</Link>
          <Link to="/about">about 页面</Link>
          <Link to="/consult?usr=jason&psd=123456">home 的 consult 页面</Link>

          <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/consult" exact component={HomeConsult}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
