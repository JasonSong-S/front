import React, { Component } from 'react'

export default class Index extends Component {
  render() {
    console.log("home",this.props);
    return (
      <div>
        <h1>这是 home 页面</h1>
      </div>
    )
  }
}
