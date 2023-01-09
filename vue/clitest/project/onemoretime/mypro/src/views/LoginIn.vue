<template>
  <div>
    <el-row type="flex" justify="center" >
      <el-card class="login">
        <div slot="header" class="title">
          <h2>邦达物流平台</h2>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="button"
              type="primary"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {post} from "@/utils/http"
import {setToken} from "@/utils/auth"

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
          { required: true, message: "请输入活动用户名", trigger: "blur" },
          {
            pattern: /^\w{4,8}$/,
            message: "请输入4-8位的数字字母组合",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入 6 位纯数字密码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位纯数字密码",
            trigger: "blur",        
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          post("/login", this.ruleForm)
            .then((res) => {
              this.loading =false
              setToken(res.token)
              sessionStorage.setItem("nickname",res.nickname)
              this.$router.push("/")
            })
            .catch((err) => {
              this.loading =false
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  margin-top: 200px;
  width: 600px;
  .title {
    text-align: center;
  }
}
.button {
  width: 100%;
}
</style>