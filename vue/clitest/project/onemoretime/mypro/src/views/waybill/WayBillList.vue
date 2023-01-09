<template>
  <div>
    我是运单列表
    <bread-crumb :list="$route.meta.bread"></bread-crumb>
    
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
export default {
  components: { BreadCrumb },
  data() {
        return {
          
        }
      }
};
</script>

<style lang="less" scoped>
</style>