import React, { Component, lazy, Suspense } from 'react'
import { NavLink, Route } from "react-router-dom"
import { Layout, Menu } from "antd"
import { connect } from "react-redux"
import { loginAction, menuAction } from '../../redux/actions/login';
import { getInfo } from '@/api';
import { asyncRouterMap } from '@/common/routerMap';
import { filterMenu } from '../../utils/menuFilter';
import Headers from "@/components/header/Index"

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
class Index extends Component {
  state = {
    menuTree: []
  }

  // 创建异步路由
  renderRoute = (menu) => {
    let routerList = []
    const asyncRouterMap = (data) => {
      data.forEach((item) => {
        if (item.children) {
          asyncRouterMap(item.children)
        } else {
          routerList.push(<Route path={"/index"+item.path} key={item.path} component={lazy(() => import(`../../views${item.path}/Index`))}></Route>)
        }
      })
    }
    asyncRouterMap(menu)
    console.log("routerList", routerList);
    return routerList
  }

  // 渲染路由
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (<SubMenu key={item.path} title={item.meta.title}>{this.renderMenu(item.children)}</SubMenu>)
      }
      return (<Menu.Item key={item.path}><NavLink to={"/index"+item.path}>{item.meta.title}</NavLink></Menu.Item>)
    })

  }


  componentDidMount() {
    // 解决刷新数据丢失的问题
    if (this.props.res.menuReducer.length) {  // 根据 rudux 中数据的长度来判断是否是首次加载，首次加载的长度不为0，不作任何处理
      // 首次加载
      const menuTree = this.renderMenu(this.props.res.menuReducer)
      this.setState({
        menuTree
      })
    } else {
      // 根据存储的 token 和后端的接口，获取用户的昵称和权限，并重新将相关的数据存储在 redux 中
      getInfo().then((res) => {
        const { loginAction, menuAction } = this.props
        loginAction({ role: res.data.role, nickname: res.data.nickname })
        menuAction(filterMenu(asyncRouterMap, res.data.role))
        const menuTree = this.renderMenu(this.props.res.menuReducer)
        this.setState({
          menuTree
        })
      })
      const menuTree = this.renderMenu(this.props.res.menuReducer)
      this.setState({
        menuTree
      })
    }

  }

  render() {
    return (
      <div>
        <Layout>
          <Sider style={{ height: "100vh", backgroundColor: "gray" }}>
            <h1 style={{textAlign:"center", lineHeight:"50px",color:"#fff"}}>好学教育</h1>
            <Menu theme='dark'>
              {this.state.menuTree}
            </Menu>
          </Sider>
          <Layout style={{ backgroundColor: "#f4f4f4" }}>
            <Header style={{ backgroundColor: "#fff",textAlign:"right"}}>
              <Headers></Headers>
            </Header>
            <Suspense fallback={<div>Loading ...</div>}>
              <Content>
                {this.renderRoute(this.props.res.menuReducer)}
              </Content>
            </Suspense>
          </Layout>
        </Layout>
      </div>
    )
  }
}


export default connect(state => ({ res: state }), { loginAction, menuAction })(Index)


