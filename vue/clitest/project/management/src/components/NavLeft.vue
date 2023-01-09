<template>
    <div class="nav">
      <h1 class="title pt pb">邦达物流平台</h1>
      <el-menu
        background-color="#001529"
        text-color="#fff"
        class="aside"
        :router="true">
          <menus-vue v-for="(item,index) in menuData" :key="index" :menu="item"></menus-vue>
      </el-menu>
    </div>
</template>

<script>
    import MenusVue from "@/components/MenusVue"
    import {get} from "@/utils/http"
    export default {
        data(){
          return{
            menuData:[]
          }
        },
        components:{
          MenusVue
        },
        methods:{
          // 获取菜单项
          async getMenu(){
            let {data}=await get("/menu")
            this.menuData = data
          }
        },
        created(){
          this.getMenu()
        }
    }
</script>

<style lang="less" scoped>

// .aside{height:100vh}
.title{text-align: center;color:#fff;background: rgb(0,21,41);}
</style>