import React, { Component } from 'react'
import { DownOutlined, UserOutlined,HomeOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginAction,menuAction } from '../../redux/actions/login';


 class Index extends Component {
    
    logOut=()=>{
        const {loginAction,menuAction} = this.props
        console.log(1111,this.props);
        sessionStorage.clear()
        loginAction({role:"",nickname:""})
        menuAction([])
    }
    render() {
        const {nickname}=this.props.res.loginReducer
        
        const items = [
            {
                key: '1',
                label: (
                        <NavLink to="/index/personal">个人中心</NavLink>
                ),
                icon:<UserOutlined />
            },
            {
                key: '2',
                label: (
                    <a  rel="noopener noreferrer" href="/login" onClick={this.logOut}>
                       退出登录
                    </a>
                ),
                icon: <HomeOutlined />,
            },
        ];
        return (
            <div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            欢迎你,{nickname}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        )
    }
}
export default connect(state=>({res:state}),{loginAction,menuAction})(Index)
