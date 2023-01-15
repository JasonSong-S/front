import React, { Component } from 'react'
import { connect } from 'react-redux'
import {aboutAction} from "../../redux/actions/about"
class Index extends Component {
  render() {
    const {aboutRes:{aboutReducer:{name,msg}}}=this.props
    return (
      <div>
        <h1>我是 about 页面,我的名字是{name},我的数据是：{msg}</h1>
      </div>
    )
  }
}
export default connect((state)=>({aboutRes:state}),{change:aboutAction})(Index)
