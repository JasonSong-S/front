import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { asyncRouterMap } from '../../common/routerMap';

const {SubMenu} = Menu
const { Header, Sider, Content } = Layout;
export default class Index extends Component {

  state={
    menuTree:[]
  }

  componentDidMount(){
   const menuTree = this.renderMenu(asyncRouterMap)
    this.setState({menuTree})
  }
  
  renderMenu=(data)=>{
    return data.map((item)=>{
      if(item.children){
        return <SubMenu title={item.meta.title} key={item.path}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path}>{item.meta.title}</Menu.Item>
    })
  }
  render() {
    console.log("home", this.props);
    return (
      <div>
        <Layout>
          <Sider style={{ background: "gray", height: "100vh" }}>
            <Menu >
              {this.state.menuTree}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "gray" }}>Header</Header>
            <Content>Content</Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
