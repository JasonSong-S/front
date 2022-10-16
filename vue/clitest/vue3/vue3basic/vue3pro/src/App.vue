<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <h1>{{msg}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
/* 
setup() 生命周函数，发生在 beforeCreated() 生命周期之前，直接替代了 beforeCreated() 和 created() 生命周期
*/
export default {
  name: 'App',
  // 生命周函数
  setup(){
    let msg = "今天是 10/14"
    return{
      msg
    }
    
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
