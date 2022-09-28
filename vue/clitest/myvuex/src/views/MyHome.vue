<template>
    <div>
        <h1 @click="addCount">我是主页面 {{a}}</h1>
        <p @click="minusCount">vuex 中的state： {{b}}</p>
        <p>vuex 中的getters： {{RMB}}</p>
        <button @click="change">调用 mutations</button><br>
        <button @click="change1">payload 形式的调用 mutations</button>
        <p>vuex 中的mutations： {{count}}</p>
        <button @click="changeAction">调用 actions</button><br>
        <p>模块中的数据:----{{text}}</p>
        <p>命名空间 --- {{ textA}}</p>
        <p>命名空间 --- {{ textB}}</p>
        <button @click="changeTextN">调用命名空间</button><br>

        <!-- <my-about></my-about> -->
    </div>
</template>

<script>
import {ADD, MINUS} from '../store/mutation-type'
// import MyAbout from './MyAbout.vue'
    export default {
        // components:{MyAbout}
        computed:{
            a(){
                return this.$store.state.info;
            },
            b(){
                return this.$store.state.num;
            },
            money(){
                return this.$store.getters.money;
            },
            dollar(){
                return this.$store.getters.dollar(6);
            },
            RMB(){
                return this.$store.getters.RMB;
            },
            count(){
                return this.$store.state.count;
            },
            text(){
                // 调用模块中的数据的方法    ... state.模块名.数据
                return this.$store.state.moduleA.moduleC.text
            },
            textA(){
                console.log(this.$store.state);
                return this.$store.state.moduleA.text;
            },
            textB(){
                console.log(this.$store.state);
                return this.$store.state.moduleB.text;
            }
            
        },
        methods:{
            change(){
                this.$store.commit('increment1',10);
            },
            change1(){
                this.$store.commit({type:'increment2',amount:20});
            },
            addCount(){
                this.$store.commit(ADD);
            },
            minusCount(){
                this.$store.commit(MINUS);
            },
            changeAction(){
                // dispatch 分发 action
                this.$store.dispatch('increment')
            },
            // 关于命名空间： 如果我们直接提交 mutation 不添加模块的名字，而且模块中的 mutations 内容中具有相同名字的函数，并且这些模块都引入到了 index.js 中，那么在调用的时候不加模块的名字的话，模块中的 mutation 都会被触发。
            changeText(){
                this.$store.commit('changeText')
            },
            // namespaced:true 使用命名空间的时候，需要在 模块名.js 文件中加入关键字 namespaced:true, 使用的时候在 .vue文件中加入模块名
            changeTextN(){
                this.$store.commit('moduleA/changeText')
            }
        }
    }
</script>

<style scoped>

</style>