import {connect} from "react-redux"
import React, { Component } from 'react'
class Login extends Component{
    componentDidMount(){
        console.log(222,this.props);
    }
    add=()=>{
      console.log(123);
    }
    render(){
      return (
        <div>
          <p>Login</p>
          <h1>哈哈哈哈</h1>
          <button onClick={this.add}>增加</button>
        </div>
      )
    }
  }

export default connect((state)=>({res:state}))(Login)


