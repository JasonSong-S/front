import React, { Component } from 'react'
import { BrowserRouter,withRouter } from 'react-router-dom';
class About extends Component {
  state={
    num:0
  }
  fn=()=>{
    for (let i =0;i<10;i++){
      // this.setState({num:this.state.num+1})
      this.setState((prevState,props)=>{
        console.log(props);
        return {
          num:prevState.num + 2
        }
      })
    }
  }
  handleClick=()=>{
    this.props.history.push("/home/first")
  }
  componentDidMount(){
    this.fn()
  }
  render() {
    console.log("about",this.props);
    
    return (
      <div>
        <h1>我是 about 组件</h1>
        <button onClick={this.handleClick}>跳转</button>
        <h1>{this.state.num}</h1>
      </div>
      
    )
  }
}
export default withRouter(About)