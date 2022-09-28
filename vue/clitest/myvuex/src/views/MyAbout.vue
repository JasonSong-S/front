<template>
    <div>
        <h1>我是 about {{b}}</h1>
    </div>
</template>

<script>
    export default {
        computed:{
            b(){
                return this.$store.state.info;
            }
        }
    }
</script>

<style scoped>

</style>