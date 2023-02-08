import React, { Component } from 'react'
import { Card, Space, Col, Row,Tabs } from 'antd';
import * as echarts from 'echarts';
export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      xData:['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      yData:[5, 20, 36, 10, 10, 20],
    }
    this.myRef=React.createRef()
  }
  componentDidMount(){
    this.drawBar()
  }

  // 绘制柱形图
  drawBar(){
    var myChart = echarts.init(this.myRef.current);
    const options={
      tooltip: {},
      xAxis: {
        data: this.state.xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.state.yData
        }
      ]
    }
    myChart.setOption(options);
  }
  render() {
    
    const items = [
      {
        key: '1',
        label: `销售额`,
        children: `Content of Tab Pane 1`,
      },
      {
        key: '2',
        label: `访问量`,
        children: `Content of Tab Pane 2`,
      },
    ];
    return (
      <div>
        {/* 头部的四个卡片 */}
        <Row>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card >
                <p>总销售额</p>
                <h1>￥1526,560</h1>
                <p>周同比 % 日同比 %</p>
                <p>日销售额￥122,560</p>
              </Card>
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card >
                <p>总销售额</p>
                <h1>￥1526,560</h1>
                <p>周同比 % 日同比 %</p>
                <p>日销售额￥122,560</p>
              </Card>
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card >
                <p>访问量</p>
                <h1>1128</h1>
                <p>周同比 % 日同比 %</p>
                <p>日均访问量78</p>
              </Card>
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card >
                <p>支付笔数</p>
                <h1>337</h1>
                <p>周同比 % 日同比 %</p>
                <p>转化率74%</p>
              </Card>
            </Space>
          </Col>
        </Row>
        {/* 中间的图表 */}
        <Row style={{margin:"50px"}}>
          <Col span={18}>
            <div  ref={this.myRef} style={{height:"300px"}}>
            
            </div>
          </Col>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card >
                <p>总销售额</p>
                <h1>￥1526,560</h1>
                <p>周同比 % 日同比 %</p>
                <p>日销售额￥122,560</p>
              </Card>
            </Space>
          </Col>
        </Row>
        
      </div>
    )
  }
}
