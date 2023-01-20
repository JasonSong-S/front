import React, { Component, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { getInfo } from '../../api';
import { loginAction, menuAction } from '../../redux/actions/login';
import { filterMenu } from '../../utils/menuFilter';
import { asyncRouterMap } from '../../common/routerMap';


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
                    routerList.push(<Route key={item.path} path={item.path} component={lazy(() => import(`@/views${item.path}/Index`))}></Route>)
                }
            })
        }
        asyncRouterMap(menu)
        console.log("routerList",routerList);
        return routerList
    }

    componentDidMount() {

        // 解决刷新 redux 中的数据丢失
        if (this.props.res.menuReducer.length) {  // 根据redux 中是否存在数据来判断是否刷新
            // 首次加载
            const menuTree = this.renderMenu(this.props.res.menuReducer)
            this.setState({
                menuTree
            })
        } else {
            // 刷新之后
            getInfo().then((res) => {

                // TODO: 无法重新渲染， redux 中的数据是空的，待解决
                /* !!!-------------- */
                const { loginAction, menuAction } = this.props
                loginAction({ role: res.data.role, nickname: res.data.nickname })
                menuAction(filterMenu(asyncRouterMap, res.data.role))
                const menuTree = this.renderMenu(this.props.res.menuReducer)
                this.setState({
                    menuTree
                })
                /* !!!-------------- */
            })

        }

    }
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return <SubMenu key={item.path} title={item.meta.title}>{this.renderMenu(item.children)}</SubMenu>
            }
            return <Menu.Item key={item.path}>{item.meta.title}</Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <Layout>
                    <Sider style={{ height: "100vh", backgroundColor: "gray" }}>
                        <Menu>
                            {this.state.menuTree}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ backgroundColor: "burlywood" }}>Header</Header>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <Content>
                                {/* TODO: */}
                                {this.renderRoute(this.props.res.menuReducer)}
                                {/* {this.renderRoute(asyncRouterMap)} */}
                            </Content>
                        </Suspense>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default connect(state => ({ res: state }), { loginAction, menuAction })(Index)
