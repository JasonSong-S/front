<template>
    <div>
        <bread-crumb :list="this.$route.meta.bread"></bread-crumb>
        我是详情页面
        <el-button type="primary" @click="back">返回</el-button>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
    export default {
        components:{
            BreadCrumb
        },
        methods:{
            back(){
                this.$router.push("/waybill/list")
            }
        }
    }
</script>

<style lang="less" scoped>

</style>