<template>
    <div>
<el-container>
        <el-aside width="200px">
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
    <el-footer class="footer">京ICP备 888888</el-footer>
  </el-container>
</el-container>
    </div>
</template>

<script>
    import TopHeader from "@/components/TopHeader"
    import NavLeft from "@/components/NavLeft"

    export default {
        components:{
            TopHeader,NavLeft
        }
    }
</script>

<style lang="less" scoped>
.header{background: #fff;line-height: 60px;box-shadow: 0 1px grey;}
.body,.footer{
    background: #e9eef3;
}
</style>