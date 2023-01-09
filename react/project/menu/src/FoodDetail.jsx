import axios from 'axios'
import React, { Component } from 'react'

export default class FoodDetail extends Component {
    state = {
        resultList: [],
        keyword: ""
    }
    getKey = () => { this.setState({ keyword: this.props.location.search.split("=")[1] })
this.forceUpdate()
}
    // getKey = () => { this.setState((state,props)=>{console.log(props); return {keyword:props.location.search.split("=")[1]}}) }
    getFood = () => {
        axios.get("http://localhost:3001/search", {
            params: {
                keyword: this.state.keyword,
                num: 10,
                appkey: "c671a4c29ec3381b"
            }
        }).then((res)=>{console.log("关键字菜品",res.data);})
    }
    componentDidMount() {
        this.getKey()
        
    }
    render() {
        this.getFood()
        console.log(this.props);
        return (
            <div>
                <h1>FoodDetail页面</h1>
                <h1>{this.state.keyword}</h1>
            </div>
        )
    }
}
