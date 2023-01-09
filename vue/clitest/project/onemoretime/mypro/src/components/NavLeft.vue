<template>
  <div>
    <h2 class="title">邦达物流平台</h2>
    <div>
      <el-menu
      background-color="#001529"
        text-color="#fff"
        class="aside"
        :router="true">
        <menus-vue v-for="(item,index) in menuList" :key="index" :menu="item"></menus-vue>
      </el-menu>
    </div>
  </div>
</template>

<script>
import {get} from "@/utils/http"
import MenusVue from "./MenusVue.vue"
export default {
    data(){
        return{
            menuList:[]
        }
    },
    methods:{
        getMenu(){
            get("/menu").then((res)=>{
                this.menuList = res.data
            })
        }
    },
    created(){
        this.getMenu()
    },
    components:{
        MenusVue
    }
};
</script>

<style lang="less" scoped>
.title {
  color: white;
  text-align: center;
  margin: 10px 0;
}
</style>