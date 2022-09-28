import Mock from "mockjs"
// Mock.mock("地址"，"请求方式"，"回调函数")

// 模拟网络请求延时
Mock.setup({
    timeout:500
})

// 登录接口
Mock.mock("http://localhost:8080/login","post",req=>{
    // 请求对象
    const {username, password} = JSON.parse(req.body);
    // 根据用户名和密码查询数据库，查询出数据并返回给前端
    if (username == "admin" && password == 123456){
        return {
            code:200,
            success:true,
            message:"登录成功",
            token:"12345678990",
            nickname:"jason"
        }
    }else{
        return {
            code:100,
            success:false,
            message:"用户名和密码不匹配",
            
        }
    }
    
});

// 入职日期接口
Mock.mock("http://localhost:8080/in","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        time:"2020-07-01 00:00:00"
    }
})

// 菜单接口
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]

Mock.mock("http://localhost:8080/menu","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:menuList
    }
})

// 折线图接口
Mock.mock("http://localhost:8080/line","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:{
            '22-01':30,
            '22-02':84,
            '22-03':56,
            '22-04':47,
            '22-05':84,
            '22-06':61,
            '22-07':90,
        }
    }
})
//订单管理-订单列表
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//订单号
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移动端","pc端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47
        })
    }
})