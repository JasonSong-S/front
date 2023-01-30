import React, { Component } from 'react'
import Layout from "./views/layout/Index"
import Login from "./views/login/Index"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { authLogin } from './utils/login'
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={(props)=>{return <Redirect to="/index/home"></Redirect>}}></Route>
            <Route path="/index" render={(props)=>{if (authLogin()){
              return <Layout {...props}></Layout>
            }else{
             
              return <Redirect to="/login"></Redirect>
              // return <Login {...props}></Login>
             
            }}}></Route>
            <Route path="/login" render={(props)=>{if (authLogin()){
               return <Redirect to="/index/home"></Redirect>
            }else{
              return <Login {...props}></Login>
             
            }}}></Route>
          </Switch>
        </Router>
       
      </div>
    )
  }
}
