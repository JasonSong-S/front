import React, { Component } from 'react'
import { connect, Connect } from 'react-redux'
import { aboutAction2 } from '../../redux2/actions/about'

 class Index extends Component {
  render() {
    console.log("about",this.props);
    return (
      <div>我是about组件</div>
    )
  }
}


export default connect((state)=>({res:state}),{change:aboutAction2})(Index)