<template>
    <div>
        
        <el-submenu v-if="menu.children" :index="menu.url" class="mitem">
            <i class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
            <nav-vue v-for="(item,index) in menu.children" :key="index" :menu="item"></nav-vue>
        </el-submenu>
        <el-menu-item v-else :index="menu.url">
            <i class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name:"NavVue",  // 组件的 name 属性是在递归的时候使用
        props:{
            menu:{
                type:Object,
                required:true
            }
        }
    }
</script>

<style lang="less" scoped>
.mitem{width: 200px;}
</style>