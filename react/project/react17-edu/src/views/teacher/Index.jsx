import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Select, Button, Table,Pagination,message } from "antd"
import { getTeacherList,deletes } from '../../api/teacher';
import AddModal from './AddModal';
import moment from 'moment';
const { Option } = Select


export default class Index extends Component {
  state = {
    disabled: true,
    dataSource: [],
    pageData: {
      page: 2,
      pageSize: 10
    },
    visible: false,
    total:0,
    record:{},
    title:""
  }


  

 edit = (record)=>{
    
    this.setState({visible:true,record:record,title:"编辑教师"},()=>{
      const birth = moment(record.birth)
      const date = moment(record.date)
      this.aRef.formRef.setFieldsValue({...record,birth,date})})
    
  }

  search = () => {
    this.loadData()

  }

  reset = () => {
    this.formRef.resetFields()
    this.setState({
      pageData: {
        page: 1,
        pageSize: 10
      }
    })
    this.loadData()
  }

  loadData = () => {
    const formData = this.formRef.getFieldsValue(true)
    getTeacherList({ ...this.state.pageData, ...formData }).then((res) => { this.setState({ dataSource: res.data,total:res.total }) })

  }

  showModal = () => {
    this.setState({ visible: true,title:"新建教师" })
    this.aRef.formRef.resetFields()
  }

  closeModal = (close) => {
    this.setState({ visible: close })
  }

  onChange=(page,pageSize)=>{
    this.setState({pageData: {
      page,
      pageSize
    }},()=>{this.loadData()})
    
  }


  componentDidMount() {
    this.loadData()
  }

  deletes =(id)=>{
    deletes({id}).then((res)=>{
      if (res.code ==0){
        message.success(res.msg)
        this.loadData()}
    })
  }



  render() {
    const { disabled, dataSource,total,record,title } = this.state
    const   columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: "center",
        render: (text, record, index) => index + 1
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: "center"
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align: "center",
        render: (text) => { return text === 1 ? "男" : "女" }
      },
      {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        align: "center",
        render: (text) => {
          if (text == 1) {
            return "初级教师"
          } else if (text == 2) {
            return "中级教师"
          } else if (text == 3) {
            return "高级教师"
          } else if (text == 4) {
            return "特级教师"
          }
        }
      },
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        align: "center"
      },
      {
        title: '科目',
        dataIndex: 'subject',
        key: 'subject',
        align: "center"
      },
      {
        title: '入职日期',
        dataIndex: 'date',
        key: 'date',
        align: "center"
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: "center"
      },
      {
        title: '手机号码',
        dataIndex: 'tel',
        key: 'tel',
        align: "center"
      },
      {
        title: '毕业院校',
        dataIndex: 'school',
        key: 'school',
        align: "center"
      },
      {
        title: '出生年月',
        dataIndex: 'birth',
        key: 'birth',
        align: "center"
      },
      {
        title: '家庭住址',
        dataIndex: 'address',
        key: 'address',
        align: "center"
      },
      {
        title: '学历',
        dataIndex: 'education',
        key: 'education',
        align: "center"
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: "center",
        width: "240px",
        fixed: "right",
        render: (text,record) => {
          return (<div>
            <Button type='primary' size='small' onClick={()=>{this.edit(record)}}>编辑</Button>
            <Button danger size='small' className='ml' onClick={()=>{this.deletes(record.id)}}>删除</Button>
          </div>)
        }
      },
    ];


    return (
      <div>
        <Card>
         
          <Form
            ref={a => this.formRef = a}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="姓名" name="name">
                  <Input />
                </Form.Item>

              </Col>
              <Col span={6}>
                <Form.Item label="科目" name="subject">
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="手机号" name="tel">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item >
                  <Button type='primary' onClick={this.search}>搜索</Button>
                  <Button className='ml' onClick={this.reset}>重置</Button>
                </Form.Item>
              </Col>

            </Row>

          </Form>
        </Card>
        <Card>
          <Button type='primary' onClick={this.showModal}>新建员工</Button>
          <Button className='ml' danger disabled={disabled}>批量删除</Button>

        </Card>
        <Card>
          <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} rowKey={(record) => record.id} pagination={false} />;
        </Card>
        <Card><AddModal visible={this.state.visible} close={this.closeModal} reload={this.loadData} record={record} ref={a=>this.aRef=a} title={title}/>
        <Pagination size="small" total={total} defaultCurrent={1} onChange={this.onChange} showSizeChanger showQuickJumper />
        </Card>
      </div>
    )
  }
}
