import axios from 'axios'
import React, { Component } from 'react'

export default class FoodDetail extends Component {
    state = {
        categoryId: "",
        resultList: [],
        keyword: ""
    }
    componentDidMount() {
        console.log(111,this.props);
        if (this.props.location.search.split("=")[1]) {
            this.getCategory()
        } else {
            this.getFood()
        }
    }
    getFood = () => {
        axios.get("http://localhost:3001/search", {
            params: {
                keyword: this.props.history.location.state.keyword,
                num: 10,
                appkey: "c671a4c29ec3381b"
            }
        }).then((res) => { this.setState({ resultList: res.data.result.list }) })
    }

    getCategory() {
        axios.get("http://localhost:3001/byclass", {
            params: {
                classid: this.props.history.location.search.split("=")[1],
                num: 10,
                start: 0,
                appkey: "c671a4c29ec3381b"
            }
        }).then((res) => { this.setState({ resultList: res.data.result.list }) })
    }
    render() {
        const list = this.state.resultList.map((item) => (<div>
            <h1 key={item.id}>{item.name}</h1>
            <img src={item.pic}/>
            <h2>介绍：</h2>
            <p dangerouslySetInnerHTML={{__html:item.content}}></p>
            <h2>材料：</h2>
            <div>{item.material.map((m, index) => <p key={index}>{index + 1}.{m.mname}:{m.amount}</p>)}</div>
            <h2>步骤：</h2>
            <div>{item.process.map((m, index) => <p key={index} dangerouslySetInnerHTML={{__html:`${index+1}.${m.pcontent}`}}></p>)}</div>
        </div>))
        return (
            <div>
                <h1 style={{textAlign:"center",color:"red"}}>FoodDetail 详情页面</h1>
                <div>{list}</div>
            </div>
        )
    }
}
