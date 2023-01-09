<template>
    <div>
        <el-row type="flex" justify="center" >
            <el-card class="container-box">
            <div slot="header" class="clearfix">
                <h2 class="title">小菜谱</h2>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                <el-input v-model="ruleForm.password" show-password type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" :loading="loading" @click="login">登录</el-button>
            </el-form-item>
            </el-form>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import {Message} from "element-ui"
import {setToken,removeToken} from "@/utils/auth"
    export default {
        data(){
            return{
                loading:false,
                ruleForm:{
                    username:"",
                    password:""
                },
                rules:{
                    username:[
                        {required:true,message:"请输入用户名",trigger:"blur"},
                        {pattern:/^\w{4,8}$/,message:"请输入4-8位的用户名",trigger:"blur"}
                    ],
                    password:[
                        {required:true,message:"请输入密码",trigger:"blur"},
                        {pattern:/^\d{6}$/,message:"请输入6位纯数字的密码",trigger:"blur"}
                    ],
                }
            }
        },
        methods:{
            login(){
                this.$refs.ruleForm.validate((valid)=>{
                    this.loading = true
                    if (valid){
                        this.loading = false
                        if (this.ruleForm.username =="jason" && this.ruleForm.password == "123456"){
                            this.$router.push("/")
                            setToken("1234567890a")
                        }else{
                            removeToken()
                            Message({
                                type:"error",
                                message:"用户名和密码不匹配"
                            })
                            
                        }
                    }else{
                        this.loading = false
                    }
                })
            }
        }
    }
</script>

<style  scoped>
.container-box{margin-top: 100px;}
.title{text-align: center;}
</style>