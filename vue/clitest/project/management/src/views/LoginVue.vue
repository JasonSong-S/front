<template>
  <div>
    <el-row type="flex" justify="center" class="box">
      <el-card class="login">
        <div slot="header" class="title">
          <h2>邦达国际物流平台</h2>
        </div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="button"
                @click="login"
                :loading="loading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { post } from "@/utils/http";
import { setToken } from "@/utils/auth";
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^\w{4,8}$/,
            message: "请输入4到8位的数字字母组合",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位纯数字的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["setRole"]),
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 登录逻辑(因为每次 url 域名和协议都时一样的，所以为了代码的简洁和使用方便，这里封装一个单独的文件 service.js 来发送 axios 请求)

          // 不封装的写法
          // axios({
          //     url:"http://localhost:8080/login",
          //     method:"post",
          //     data:this.ruleForm,
          // }).then(res=>console.log("axios",res.data))

          // 封装的写法
          post("/login", this.ruleForm)
            .then((res) => {
              // 动态增加路由, 动态添加的路由刷新就丢失
            //   this.$router.addRoute({
            //     path: "/attendance",
            //     name: "Attendance",
            //     meta: { auth: ["boss", "administration"] },
            //     component: () => import("@/views/authview/AuthAttendance"),
            //   });
            //   console.log("路由表",this.$router.getRoutes());
              this.loading = false;
              setToken(res.token);
              this.setRole(res.role)
              console.log("11111",this.$store.state.role);
              sessionStorage.setItem("nickname", res.nickname);
              this.$router.push("/");
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  margin-top: 200px;
  .login {
    width: 600px;
    .title {
      text-align: center;
    }
    .button {
      width: 100%;
    }
  }
}
</style>