<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        props:['b'],
        data(){
            return {
                breadList:[],
            }
        },
        created(){
            this.getBreadCrumb();
        },
        watch:{
            // 可以监听 data, 计算属性, props, $route
            $route(){
                this.getBreadCrumb()
            }
        },
        methods:{
            getBreadCrumb(){
                this.breadList = this.b||[]
            }
        }
    }
</script>

<style lang="less" scoped>

</style>