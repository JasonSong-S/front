import React, { Component } from 'react'
import Login from './Login'
import Home from "./components/home/Index"
import About from "./components/about/Index"


export default class App extends Component {
  render() {
    return (
      <div><Login />
        <Home />
        <About />
      </div>
    )
  }
}




