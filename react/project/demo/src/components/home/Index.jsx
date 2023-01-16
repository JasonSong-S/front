import React, { Component } from 'react'
import { connect } from 'react-redux'
import { aboutAction } from '../../redux/actions/about'
import {homeAction} from "../../redux/actions/home"
class Index extends Component {
    change=()=>{
        this.props.change("home 的数据更改了")
    }
    c=()=>{
        this.props.change2("about 的数据更改了")
    }
  render() {
    const {homeRes:{homeReducer:{name,msg}}}=this.props
    return (
      <div>
        <h1>我是 home 页面,我的名字是{name},我的数据是：{msg}</h1>
        <button onClick={this.change}>更改</button>
        <button onClick={this.c}>更改about的数据</button>
      </div>
    )
  }
}
export default connect((state)=>({homeRes:state}),{change:homeAction,
change2:aboutAction})(Index)
