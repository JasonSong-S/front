<template>
  <div>
    <bread-crumb :list="$route.meta.bread"></bread-crumb>
    <el-row type="flex" justify="center">
      <el-card class="card">
        <div slot="header" class="clearfix">
          <h3 class="info">个人信息</h3>
        </div>
        <el-form :model="form" class="form" label-width="100px">
          <el-form-item label="用户">
            <el-input v-model="form.user" placeholder="用户"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="form.role" placeholder="角色"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true"
              >修改密码</el-button
            >
            <el-dialog
              title="修改密码"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-form label-width="100px" :model="form" :rules="rules">
                <el-form-item label="原密码" prop="password">
                  <el-input v-model="form.password" placeholder="原密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                  <el-input v-model="form.newpassword" placeholder="新密码" show-password></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import { get } from "@/utils/http";
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      form: {
        user: "",
        role: "",
        password:"",
        newpassword:""
      },
      rules:{
        password:[
          { required: true, message: "请输入 6 位纯数字密码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位纯数字密码",
            trigger: "blur",
          },
        ],
        newpassword:[
          { required: true, message: "请输入 6 位纯数字密码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位纯数字密码",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
    };
  },
  methods: {
    async getInfo() {
      const result = await get("/personal");
      this.form.user = result.name;
      this.form.role = result.role;
    },
    handleClose(){
        this.dialogVisible=false
    }
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="less" scoped>
.card {
  width: 500px;
  margin-top: 200px;
}
.info {
  color: #333;
  font-size: 25px;
  text-align: center;
}
</style>