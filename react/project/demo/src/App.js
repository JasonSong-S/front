import React, { Component } from 'react'
import Home from './Home'
import {BrowserRouter,Route,Link} from "react-router-dom"
import About from './About'

export default class App extends Component {
  render() {
    console.log(this.props);
    return (
      
      <BrowserRouter>
      <div>
        <h1>这是 App 组件</h1>
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Route path="/home" component={Home}></Route>  
        <Route path="/about" component={About}></Route>  
      </div>
      </BrowserRouter>
    )
  }
}
