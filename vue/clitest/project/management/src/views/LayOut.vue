<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header class="header">
          <top-header></top-header>
        </el-header>
        <el-main class="body">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <el-footer class="footer"
          >京ICP备10036305号-7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京公网安备11010802022657号</el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import NavLeft from "@/components/NavLeft";

export default {
  components: {
    TopHeader,
    NavLeft,
  },
};
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  line-height: 60px;
  box-shadow: 0 1px grey;
}
.body,
.footer {
  background: #e9eef3;
}
.footer {
  font-size: 20px;
  text-align: center;
  color: grey;
}
.aside{background: #001529;}
</style>