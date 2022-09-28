<template>
    <div>
        <div class="head fr">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                欢迎你,{{info}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
                <el-dropdown-item command="c">退出登录</el-dropdown-item>
                
            </el-dropdown-menu>
        </el-dropdown>
        </div>
        <div class="date fr">
            今天是你在阿里的第 <span class="tips">{{days}}</span> 天
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import {removeToken} from "@/utils/auth"
import {get} from "@/utils/http"
    export default {
        data(){
            return{
                info:sessionStorage.getItem("nickname"),
                time:""
            }
        },
        methods:{
            handleCommand(item){
                if(item == "c"){
                    removeToken();
                    this.$router.push("/login")
                }
            },
            workTime(){
                get("/in").then((res)=>{console.log(res);this.time = res.time;})
            }
        },
        computed:{
            days(){
                let now = new Date();
                let target = this.time?new Date(this.time):new Date()
                return Math.floor((now-target)/1000/60/60/24)
            }
        },
        created(){
            // 获取入职时间
            this.workTime();
        },
        
    }
</script>

<style lang="less" scoped>
.date{
    margin-right: 50px;
    .tips{color:#5969ff}
}
</style>