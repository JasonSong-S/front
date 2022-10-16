// 存放所有需要权限的路由
export default [
    {
        path:"/attendance",
        name:"Attendance",
        meta:{auth:["boss","administration"]},
        component:()=>import("@/views/authview/AuthAttendance")
    },
    {
        path:"/salary",
        name:"Salary",
        meta:{auth:["boss","finance"]},
        component:()=>import("@/views/authview/AuthSalary")
    },
    {
        path:"*",
        name:"NotFound",
        meta:{auth:["boss","finance","administration","user"]},
        component:()=>import("@/views/NotFound")
    }
]