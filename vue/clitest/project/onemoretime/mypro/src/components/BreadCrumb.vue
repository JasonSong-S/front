<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in dataList" :key="index" >{{item}}</el-breadcrumb-item>
      
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props:["list"],
    data(){
        return{
            dataList:[]
        }
    },
    methods:{
        getBreadCrumb(){
            this.dataList = this.list || []
        }
    },
    watch:{
        $route(){
            this.getBreadCrumb()
        }
    },
    created(){
        this.getBreadCrumb()
    }
};
</script>

<style lang="less" scoped>
</style>