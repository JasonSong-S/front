import React, { Component } from 'react'
import axios from "axios"
export default class MyHome extends Component {
  state={
    value:"",
    tagList:[],
    typeList:[]
  }
  test=()=>{this.props.history.push(`/detail?keyword=${this.state.value}`)}
  handleInput=(e)=>{this.setState({value:e.target.value})}
  search=()=>{axios.get("http://localhost:3001/class",{
    params:{
      appkey: "c671a4c29ec3381b"
    }
  }).then((res)=>{console.log(res);})}
  recommend=()=>{
    axios.get("http://localhost:3001/class",{
    params:{
      appkey: "c671a4c29ec3381b"
    }
  }).then((res)=>{this.setState({tagList:res.data.result})
      // this.setState({typeList:res.data.result[0]})
    })
  }
  select=(index)=>{
    console.log(index);
  }
  componentDidMount(){
    this.recommend()
  }
  render() {
    const list = this.state.tagList.map((item,index)=><li key={item.classid} onClick={this.select}>{item.name}</li>)
    
    
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleInput}/>
        <button onClick={this.test}>搜索</button>
        <button onClick={this.search}>搜索1</button>
        <div className='tags'>种类</div>
        <div className='type'>类型</div>
        <div>{list}</div>
        
        
      </div>
    )
  }
}
