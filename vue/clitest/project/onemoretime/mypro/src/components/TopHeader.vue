<template>
  <div>
    <div class="fr">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你，{{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="fr tips">
        <span>这是您在阿里的第</span><span class="days">{{days}}</span>天
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
            nickname:sessionStorage.getItem("nickname"),
            date:""
        }
    },
    methods:{
        // 获取入职时间
        workTime(){
            get("/in").then((res)=>{this.date = res.date})
        },

        
        handleCommand(item){
            if (item == "c"){
                removeToken()
                this.$router.push("/login")
            }else if(item == "a"){
              this.$router.push("/personal")
            }else{
              this.$router.push("/personal")
            }
        }
    },
    mounted(){
        this.workTime()
    },
    computed:{
        days(){
            let now = new Date();
                let target = this.date?new Date(this.date):new Date()
                return Math.floor( (now - target)/1000/60/60/24)
        }
    }
};
</script>

<style lang="less" scoped>
.tips{margin-right: 20px;}
.days{color: rgb(6, 176, 176);}                 
</style>