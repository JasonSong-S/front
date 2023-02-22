import React, { Component } from 'react'
import { connect } from 'react-redux'
import {aboutAction} from "../../redux/actions/about"
 class Index extends Component {
    componentDidMount(){
        console.log(3333,this.props)
    }
    test = ()=>{
      this.props.aboutAction("jason进行了修改")
    }
  render() {
    return (
      <div onClick={this.test}>我是about组件---{this.props.res.homeReducer.msg}</div>
    )
  }
}

export default connect((state)=>({res:state}),{aboutAction})(Index)
