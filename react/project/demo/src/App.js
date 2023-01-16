import React, { Component } from 'react'
import Home from "./components/home/Index"
import About from "./components/about/Index"
import TestLifeCycle from './TestLifeCycle';
export default class App extends Component {
  componentDidMount(){}
  render() {
    return (
      <div>
        <p>我是 App 组件</p>
        <Home />
        <About />
        <TestLifeCycle />
      </div>
    )
  }
}
