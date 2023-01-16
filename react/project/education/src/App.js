import 'antd/dist/reset.css';
import "./App.css"
import React, { Component } from 'react'
import { BrowserRouter as Router, Route,  Switch, Redirect } from "react-router-dom"
import Home from "./views/Home/Index"
import Login from "./views/Login/Index"
import { authLogin } from './utils/auth';
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
                if (authLogin()){
                  return <Home {...props}/>
                }else{
                  return <Login></Login>
                }
              }}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </div>
          
      </Router>
    )
  }
}
