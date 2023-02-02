import React, { Suspense } from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { renderRoutes } from "react-router-config"
import routes from './routeConfig'
export default function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div>加载中</div>}>
          {renderRoutes(routes)}
        </Suspense>
      </div>
    </Router>
  )
}
