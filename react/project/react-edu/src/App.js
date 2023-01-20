import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
import Home from "./views/home/Index"
import Login from "./views/login/Index"
import { authLogin } from './utils/login'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
             <Route path="/" exact render={(props)=>{
              return <Redirect to="/home"></Redirect>
            }}></Route> 
            <Route path="/home" render={(props)=>{
              // 如果没有登录去登录页面，根据 token 来判断
              if(!authLogin()){
               return <Redirect to="/login"></Redirect>
              }else{
                return <Home {...props}></Home>
              }
            }}></Route>
            <Route path="/login" render={(props)=>{
              if(authLogin()){
                return <Redirect to="/home"></Redirect>
              
              }else{
                return <Login {...props}></Login>
              }
            }}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
