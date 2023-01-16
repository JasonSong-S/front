import React, { Component } from 'react'
import style from "./index.module.css"
import { Card, Tabs,  Form, Input,Button } from 'antd';
import {login} from "../../api"
export default class Index extends Component {
  login=()=>{
    this.formRef.validateFields().then(
      (res)=>{
        // 表单验证成功，去登录
        login(res).then((res)=>{sessionStorage.setItem("token",res.token)
        this.props.history.push("/home")
      }).catch((err)=>{console.log(err);})
        
      })
  }
  render() {
    console.log("login", this.props);
    return (
      <div className={style.wrapper}>
        <Card title="好学教育管理平台" style={{ width: 500 }} headStyle={{ textAlign: "center" }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="手机号密码登录" key="1">
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                ref={(a)=>this.formRef=a}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入账号' },{
                    pattern:/^\w{4,8}$/,message: '账号为4到8位的字符串'
                  }]}
                >
                  <Input placeholder="请输入手机号"/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' },{
                    pattern:/^\d{6}$/,message: '密码为6位纯数字'
                  }]}
                >
                  <Input.Password placeholder="请输入密码"/>
                </Form.Item>

                <Form.Item >
                  <Button type="primary" htmlType="submit" style={{width:"100%"}} onClick={this.login}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>


            </Tabs.TabPane>
            <Tabs.TabPane tab="新用户注册" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
