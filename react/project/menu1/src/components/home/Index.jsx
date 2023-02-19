import React, { Component } from 'react'
import {connect} from "react-redux"
 class Index extends Component {
  render() {
    return (
      <div>我是home组件---{this.props.res.aboutReducer.msg}</div>
    )
  }
}

export default connect(state=>({res:state}))(Index)
