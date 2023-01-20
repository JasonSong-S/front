import React, { Component } from 'react'
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
    componentDidMount() {
       
        // 解决刷新 redux 中的数据丢失
        if (this.props.res.menuReducer.length) {  // 根据redux 中是否存在数据来判断是否刷新
            console.log(6666666,this.props);
            // 首次加载
            const menuTree = this.renderMenu(this.props.res.menuReducer)
            this.setState({
                menuTree
            })
        } else {
            // 刷新之后
            getInfo().then((res) => {
                // const { loginAction, menuAction } = this.props
                // loginAction({ role: res.data.role, nickname: res.data.nickname })
                // menuAction(filterMenu(asyncRouterMap, res.data.role))
                // const menuTree = this.renderMenu(this.props.res.menuReducer)
                // console.log(33333333,res);
                // console.log(5555555,this.props);
                // this.setState({
                //     menuTree
                // })
                // menuAction([1,2,3])
                // console.log(5555555,this.props);
                // TODO: 无法重新渲染， redux 中的数据是空的，待解决
                loginAction({role:res.data.role,nickname:res.data.nickname})
                menuAction(filterMenu(asyncRouterMap,res.data.role))
                const menuTree = this.renderMenu(this.props.res.menuReducer)
                this.setState({
                menuTree
            })
                
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
        console.log("home", this.props);
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
                        <Content>Content</Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default connect(state => ({ res: state }), { loginAction, menuAction })(Index)
