<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header>
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="foot">京ICP备10036305号-7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京公网安备11010802022657号</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from "@/components/NavLeft"
import TopHeader from "@/components/TopHeader"
    export default {
        components:{
            NavLeft,TopHeader
        }
    }
</script>

<style scoped>
.aside{height: 100vh;background: #001529;}
.main{height: 50vh;background: #e9eef3;}
.foot{line-height: 50px;text-align: center;color: #999;background: #e9eef3;}
</style>