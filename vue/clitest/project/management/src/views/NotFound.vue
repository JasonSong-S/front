<template>
    <div>
        <el-result title="404" subTitle="抱歉，请求错误">
            <template slot="icon">
                <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
            </template>
            <template slot="extra">
                <el-button type="primary" size="medium"><router-link to="/">返回首页</router-link></el-button>
            </template>
        </el-result>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>

</style>
