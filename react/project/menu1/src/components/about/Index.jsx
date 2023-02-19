import React, { Component } from 'react'
import { connect } from 'react-redux'
import {aboutAction} from "../../redux/actions/about"
 class Index extends Component {
    componentDidMount(){
        console.log(3333,this.props)
    }
  render() {
    return (
      <div>我是about组件---{this.props.res.homeReducer.msg}</div>
    )
  }
}

export default connect((state)=>({res:state}),{change:aboutAction})(Index)
