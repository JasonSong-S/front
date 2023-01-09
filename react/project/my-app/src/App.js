import React, { Component,lazy,Suspense } from 'react'  // 从 react 引入 lazy Suspense
import { Route, Link, NavLink, Switch, Redirect } from "react-router-dom"
import {renderRoutes} from "react-router-config"
import routes from './routesconfig'
// import About from './About'   // 非懒加载的方法
const About = lazy(()=>import("./About"))  // 懒加载的方法




function First() {
  return (
    <h1>我是 home 的首页</h1>
  )
}

function Consult() {
  return (
    <h1>我是 home 的资讯页</h1>
  )
}



export default class App extends Component {
  render() {
    return (

      <div>
        <h1>我是App组件</h1>
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Suspense fallback={<h1>加载中</h1>}>
          <Switch>
            <Route path="/home" render={() => (
                <div>
                  我是Home组件
                  <Link to={{pathname:"/home/first", state:{name:"jason",age:27}}}>home的首页</Link>
                  <Link to="/home/consult">home的资讯页</Link>
                  <NavLink to={{pathname:"/test"}}>test 集中管理静态路由</NavLink>
                  <Route path="/home/first" render={(props) => {
                    console.log(props);
                    return (<div>
                      <h1>我是 first 中的 render 方式写的</h1>
                      <First></First>
                    </div>)
                  }}>
                  </Route>
                  <Route path="/home/consult" render={() => (
                    <div>
                      <h1>我是 consult 中使用 render 写的</h1>
                      <Consult></Consult>
                    </div>
                  )}></Route>
                </div>
              )}></Route>
            <Route path="/about" component={About} ></Route>
            {renderRoutes(routes)}
            <Redirect to='/home' ></Redirect>
          </Switch>

        </Suspense>

      </div>

    )
  }
}
