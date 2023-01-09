<template>
   <div>
    <div class="head fr">
       <el-dropdown @command="handleCommand">
           <span>
              欢迎您，{{info}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
           <el-dropdown-menu slot="dropdown">
           <el-dropdown-item command="a">个人中心</el-dropdown-item>
           <el-dropdown-item command="b">修改密码</el-dropdown-item>
           <el-dropdown-item command="c">退出登录</el-dropdown-item>
           </el-dropdown-menu>
       </el-dropdown>
    </div>
      <div class="tips fr">
                   <span>这是您在阿里的第 <span class="days">{{days}} </span>天</span>

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
                date:""
            }
        },
        methods:{
            handleCommand(item){
                if (item == "c"){
                    removeToken()
                    this.$router.push("/login")
                }else if(item === "b"){
                    console.log(this.$router);    // $router 是跟路由
                }else if (item === "a"){
                    //   console.log(this.$route);   // $route 是当前的路由
                    this.$router.push("/personal")
                }
            },
            // 获取入职时间的方法
            workTime(){
                get("/in").then((res)=>{this.date = res.date;})
            }
        },
        computed:{
            days(){
                let now = new Date();
                let target = this.date?new Date(this.date):new Date()
                return Math.floor( (now - target)/1000/60/60/24)
            }
        },
        created(){
            this.workTime()
        }
    }
</script>

<style lang="less" scoped>
.tips{margin-right: 30px;}
.days{color:#5696ff}
</style>