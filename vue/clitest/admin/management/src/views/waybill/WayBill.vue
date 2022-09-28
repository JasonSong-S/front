<template>
    <div>
        <bread-crumb :b="this.$route.meta.bread"></bread-crumb>
    </div>
</template>

<script>
    import BreadCrumb from "@/components/BreadCrumb"

    export default {
        
        components:{BreadCrumb}
    }
</script>

<style lang="less" scoped>

</style>