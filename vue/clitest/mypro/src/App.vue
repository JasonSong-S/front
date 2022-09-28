/* 
    单文件组件：都是以 .vue 结尾，一个文件就是一个组件，允许正常的编写 html，支持模块化的样式

    如果没有单文件组件的话：
      1. 多个组件写在一个页面中，乱
      2. 没有 html 提示，没有语法高亮
      3. 样式的模块化明显被遗漏了
 */

/* template 中写 html， 注意只能有一个挂载点，多个挂载点会引发错误 */

<template>
    <div id="app">
      <div class="box"></div>
      <h1 @click="fn">{{msg}}</h1>
      <!-- router-view 渲染路由视图的地方 -->
      <router-view></router-view>
    </div>
</template>

<script>
export default{     // 在 .vue 导出整个文件，不仅仅是这里的 js， 还包括这里的 template 和 style
  data(){
    return {msg:'我是 App 组件！'}
  },
  methods:{
    fn(){
      console.log(this.$route);
    }
  }
}
</script>

<style scoped>
.box{background-color: red;width: 500px;height: 500px;}
</style>
