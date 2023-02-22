import React, { Component } from 'react'
import style from "./index.module.css"
import { Card, Tabs, Form, Input, Button } from 'antd';
import { login } from '../../api';
import {connect} from "react-redux"
import { loginAction,menuAction } from '../../redux/actions/login';
import { asyncRouterMap } from '../../common/routerMap';
import { filterMenu } from '../../utils/menuFilter';

class Index extends Component {

  login = () => {
    this.formRef.validateFields()
    .then(
      // 表单验证成功
      (res)=>{
      login(res).then(
        // 登录成功
        (res)=>{
          const {loginAction,menuAction,history} = this.props
          // 存储 token
          sessionStorage.setItem("token",res.token)
          // 存储权限和昵称
          loginAction({role:res.role,nickname:res.nickname})
          //  筛选角色对应的路由，并且存在 redux 中
          menuAction(filterMenu(asyncRouterMap,res.role))
           // 跳转
           history.push("/index/home")

      
      }).catch(

        // 登录失败
        (err)=>{console.log("登录失败",err);}
      )
    }).catch(

      // 表单验证失败失败
      (err)=>{console.log("表单验证失败",err);}
    )
  }

  render() {
    const items = [
      {
        key: '1',
        label: `手机验证码登录`,
        children: <Form
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          ref={a => this.formRef = a}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              { pattern: /^\w{4,8}$/, message: '账号的长度要求4到8位', }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { pattern: /^\d{6}$/, message: '密码为6位纯数字', }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={this.login}>
              立即登录
            </Button>
          </Form.Item>
        </Form>,
      },
      {
        key: '2',
        label: `新用户注册`,
        children: <h1>hello</h1>,
      }
    ];
    return (
      <div className={style.wrapper}>
        <Card title="好学教育后台管理系统" style={{ width: 500 }} headStyle={{ textAlign: "center" }} bordered={false}>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </div>
    )
  }
}

export default connect(state=>({res:state}),{loginAction,menuAction})(Index)
