<template>
    <div>
        <h1>页面不存在 {{info}}</h1>
    </div>
</template>

<script>
    export default {
        computed:{
            info(){
                return this.$store.state.info;
            }
        }
    }
</script>

<style scoped>

</style>