<template>
    <div>
        <el-row type="flex" justify="center" align="middle">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>蚂蚁金融后台管理系统</h2>
                </div>
                <div>
                    <el-form 
                            :model="ruleForm" 
                            :rules="rules" 
                            ref="ruleForm" 
                            label-width="100px" 
                            class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                             <el-button type="primary" style="width:100%" @click="login" :loading=loading>登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import {post} from '@/utils/http.js'
import {setToken} from '@/utils/auth'
    export default {
        data(){
            return {
                ruleForm:{
                    username:'',
                },
                rules:{
                    username:[
                        {required:true,message:'请输入用户名！！',trigger:'blur'},
                        {pattern:/^\w{4,8}$/,message:'请输入4到8位的用户名',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'请输入密码！！',trigger:'blur'},
                        {pattern:/^\d{6}$/,message:'请输入6位纯数字',trigger:'blur'}
                    ]
                },
                loading:false,
            }
        },
        methods:{
            login(){
                this.$refs.ruleForm.validate(valid=>{
                    if (valid){
                        this.loading = true;
                        // 登录逻辑0
                        /* axios({
                            url:"http://localhost:8080/login",
                            method:"post",
                            data:this.ruleForm,
                            // data:{
                            //     username:this.ruleForm.name,
                            //     password:this.ruleForm.password
                            // }
                        }).then(res=>{console.log("then",res.data);}) */
                        // 登录逻辑1 封装后的 axios 请求
                        post("/login",this.ruleForm)
                        .then(res=>{
                            console.log(res);
                            setToken(res.token);
                            sessionStorage.setItem("nickname",res.nickname);
                            this.loading = false;
                            this.$router.push("/");
                        }).catch((error)=>{ this.loading = false;console.log(error)}
                        )
                    }else{
                        alert('error');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.box-card{
    width: 500px;
    margin-top: (300px/2);

    h2{
        text-align: center;
    }
}
</style>