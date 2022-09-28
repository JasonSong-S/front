<template>
    <div>
        <h1>我是 home 组件</h1>
        <router-view></router-view>
        <router-link :to="{name:'aaa'}">跳转到 login</router-link>
    </div>
    
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>