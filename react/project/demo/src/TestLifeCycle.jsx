import React, { Component } from 'react'

export default class TestLifeCycle extends Component {
    constructor(){
        console.log("parent--constructor");
        super()
        this.state={
            msg:1
        }
    }
    change=()=>{
        this.setState({msg:2})
    }
    UNSAFE_componentWillMount(){
        console.log("parent--componentWillMount");
    }
    componentDidMount(){
        console.log("parent--componentDidMount");
    }
    componentDidUpdate(){
        console.log("parent--componentDidUpdate");
    }
  render() {
    console.log("parent--render");
    return (
      <div>
        <h1>TestLifeCycle 组件</h1>
        <h1 onClick={this.change}>{this.state.msg}</h1>
        <Child a={this.state.msg}/>
      </div>
    )
  }
}


class Child extends Component{
    constructor(){
        console.log("constructor");
        super()
    }

    UNSAFE_componentWillMount(){
        console.log("componentWillMount");
    }
    componentDidMount(){
        console.log("componentDidMount");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }
    render(){
        console.log("render");
        return (
            <div>
                <h1>子组件</h1>
                <h1>{this.props.a}</h1>
            </div>
        )
    }
}
