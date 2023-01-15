import React, { Suspense } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import routes from './routeConfig'
export default function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div>加载中</div>}>
          {/* <h1>我是 app 组件</h1>
          <Link to="/home">home 页面</Link>
          <Link to="/detail">detail 页面</Link> */}
          {renderRoutes(routes)}
        </Suspense>
      </div>
    </Router>
  )
}
