import React, { Component } from 'react'
import axios from "axios"
export default class MyHome extends Component {
  state = {
    value: "",
    tagList: [],
    typeList: []
  }
  // keys = () => { this.props.history.push(`/detail?keyword=${this.state.value}`); }
  keys = () => { this.props.history.push({pathname:"/detail",state:{keyword:this.state.value}}); }
  handleInput = (e) => { this.setState({ value: e.target.value }); }
  recommend = () => {
    axios.get("http://localhost:3001/class", {
      params: {
        appkey: "c671a4c29ec3381b"
      }
    }).then((res) => {
      this.setState({ tagList: res.data.result }, () => {
        this.setState({ typeList: this.state.tagList[0].list.splice(0, 10) })
      })
    })

  }
  // 选择大的类别
  select = (index) => {
    this.setState({ typeList: this.state.tagList[index].list.splice(0, 10) })
  }
  // 选择具体的小类别
  choose = (index) => {
   // 跳转到详情页面
    this.props.history.push(`/detail?classid=${index}`)
  }
  componentDidMount() {
    this.recommend()
  }
  render() {
    const list = this.state.tagList.map((item,index) => <span style={{ display: "inline-block", width: "80px", marginRight: "20px", background: "cyan", marginBottom: "20px", textAlign: "center" }} key={item.classid} onClick={()=>{this.select(index)}}>{item.name}</span>)
    const kind = this.state.typeList.map((item)=><span style={{ display: "inline-block", width: "80px", marginRight: "20px", background: "grey", marginBottom: "20px", textAlign: "center" }} key={item.classid} onClick={()=>{this.choose(item.classid)}}>{item.name}</span>)
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleInput} />
        <button onClick={this.keys}>搜索</button>
        <div>{list}</div>
        <div>{kind}</div>
      </div>
    )
  }
}
