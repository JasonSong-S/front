import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
export default class NavLinks extends Component {
  render() {
    return (
      <div>
        <NavLink activeClassName='song' to={this.props.to}>{this.props.children}</NavLink>
      </div>
    )
  }
}
