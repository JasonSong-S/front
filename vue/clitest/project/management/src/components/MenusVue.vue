<template>
    <div>
       <el-submenu v-if="menu.children" class="mitem" :index="menu.url" >
        <template>
          <i class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
          <nav-vue v-for="(item,index) in menu.children" :key="index" :menu="item"></nav-vue>
       </el-submenu>
       <el-menu-item v-else class="mitem" :index="menu.url">
        <template>
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
          
        </template>
       </el-menu-item>
    </div>
</template>

<script>
    export default {
        name:"NavVue",
        props:{
            menu:{
                required:true,
                type:Object
            }
        }
    }
</script>

<style lang="less" scoped>
.mitem{width: 200px;}
</style>