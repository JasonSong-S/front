import Vue from 'vue'
import Vuex from 'vuex'
import {ADD, MINUS} from './mutation-type'
import moduleA from './moduleA'
import moduleB from './moduleB'

Vue.use(Vuex)  // 注册组件

export default new Vuex.Store({  // 创建 vuex 实例
  state: {   // 状态： state 中存放的就是希望共享的数据
    info:"我是共享的数据",
    num:100,
    count:1
  },
  getters: {  // 类似于计算属性 computed，默认接收的参数是 state ， 第二个参数是全局的 getters
    // 1. 基本用法
    money(state){
      return state.num+1;
    },
    // 2. getters 也可以传参
    dollar:state=>(rate)=>{
      return state.num / rate;
    },
    // 3. getters 的第二个参数： 所有的 getters
    RMB(state,getters){
      return getters.information + '元';
    },
    information(state){
      return state.num *2;
    }

  },
  mutations: {   // 修改 state 中数据的唯一办法  就是你想做得事情的列表，mutations 要通过 commit 提交
    // 1. 基本用法  
    increment(state){
      state.count++;
    },
    // 2. 载荷 payload: 可以向 store.commit 传入额外的参数，即 mutations 的载荷 payload
    increment1(state,n){
      state.count += n;
    },
    // 2.1 大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更加易读
    increment2(state,payload){
      state.count += payload.amount;
    },
    //3. 常量替代 mutation 事件类型
    [ADD](state){
      state.count++;
    },
    [MINUS](state){
      state.count--;
    },
  },

  actions: {
    // 1. 基本用法  
    increment(context){  // context： 上下文环境， action 函数接受一个与 store 实例具有相同方法的属性和方法的 context 对象， 因此可以调用 context.commit 提交一个 mutation,或者通过 context.state 和 context.getters 来获取 state 和 getters
      context.commit('increment');
    },
    // 2. 组合 action, dispatch 函数的返回值是 promise 对象
  },
  modules: {
    // 模块名：模块对象
    moduleA,moduleB
  }
})



/* 
1. vuex 不是组件， vuex 的核心是 Store 中的 index.js， 还有和它产生联系的 main.js 和其他产生联系的 .vue 文件
  1.1 Vuex 是一个专为 vue.js 应用程序开发的状态管理模式 + 库。 它采用集中式存储，管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
      这么说吧，将 vue 看做是一个 js 文件，组件就是函数， vuex 就是一个全局变量，只是这个全局变量包含了一些特定的规则
  1.2 使用
        import Vue from 'vue';   // 从核心组件引入
        import Vuex from 'vuex'; // 从核心组件引入

        Vue.use(Vuex);  // 注册组件，use 方法可以用来给专门为 vue 设计的插件尽心注册

        const  store = new Vuex.Store({
          state:{
            count:0
          }
        });

        // 在 main.js 中需要的操作
        const app = new Vue({
          el:'#app',
          // 把 store 对象提供给 'store' 选项，这可以把 store 的实例注入所有的子组件
          store,
        })
2. 五大核心概念
  2.1 state: 用来存放共享数据的
        const store = new Vuex.Store({
          state:{
            count:10,
            like:["篮球"，"足球"]
          }
        })
  2.2 getters: 类似于计算属性，默认接收的第一个参数是 state, 该参数是所有的 state,默认接收的第二个参数是 getters, 是所有的 getters, 其他的用法跟 computed 是一样的
        2.2.1 基本用法
            1.// index.js
            const store = new Vuex.Store({
              state:{
                count:10
              },
              getters:{
                money(){
                  return state.count + '元';
                }
              }
            })

            2.// App.vue 中
            mounted(){
              console.log(this.$store.getters.money)
            }
      2.2.2 getters 也可以传参
            // 用法： 使用 return 返回函数
            getters:{
              dollar:state=>(rate)=>{
                return state.rmb/rate
              }
            }
      2.2.3 getters 的第二个参数： 所有的 getters
            getters:{
              money(state,getters){
                return getters.info + '元'
              },
              info(state){
                return state.count * 2
              }
            }

  2.3 mutations: vuex 中， 修改 state 中数据的唯一方法， mutations 中修改的数据如果是引用数据类型，一定要注意使用完整的赋值（不能单独修改某一项）
    2.3.1 基本用法  mutations 要通过 this.$store.commit('mutation的名字') 在 .vue 文件中提交
            // 1. 基本用法  
              increment(state){
                state.count++;
              },
              // .vue 
              methods:{
                change(){
                this.$store.commit('increment');
              },

            // payload
            // 2. 载荷 payload: 可以向 store.commit 传入额外的参数，即 mutations 的载荷 payload
              increment1(state,n){
                state.count += n;
              },
            // 2.1 大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更加易读
            increment2(state,payload){
              state.count += payload.amount;
            },
            // .vue 文件中调用
            methods:{
            change(){
                this.$store.commit('increment1',10);
            },
            change1(){
                this.$store.commit({type:'increment2',amount:20});
            },
    2.3.2 Mutation 必须是同步函数
            为何 mutation 不能包含异步操作？
              使用层面：代码更加高效易维护，逻辑清晰规范（而不是逻辑的不允许）
              具体原因：为了让 devtools 工具能够追踪数据的变化
              详解：每个 mutation 执行完成之后都会对应到一个新的状态变更，这样 devtools 就可以打个快照存下来（每次转态的改变都会产生一个全新的 state 对象），然后就可以实现 "time-travel"了。 如果 mutation 支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

              注： vue-devtools 的时间旅行 - time-travel
              Vuex 借鉴 Flux 单向数据流的思想，采用集中式统一管理保存状态。但是这些状态不会随时间变化而改变。为了使得状态可以被捕获，重现。 vue-devtools 可以帮助我们的 Vue 应用实现这种事件旅行
              每次状态的改变都会产生一个全新的 state 对象，当你想展现什么时间的状态，只需要切换到那个时间段的 state 对象， 所以 vuex 原则上只能通过 mutation 并且非异步更改这些状态，否则无法实现 state 修改的记录保留或无法正确记录。

    2.4 actions: actions 类似 mutation, 不同在于： action 提交的是 mutation, 而不是直接变更状态， action 可以包含任何的异步操作

    2.5 modules: Vuex 允许我们将 store 分成模块(module)，每个模块拥有自己的 state, mutation, action, getter, 单独定义一个模块跟我们之前定义 store 是一样的
      2.5.1 基本用法： 1.创建新的 module.js 文件，  2.在 上层的js中引入新建的文件， 3.在上层的modules组件中注册引入的文件  4. 在目标文件中使用，使用方式为 this.$store.state.模块名。子模块名.数据名
      2.5.2 命名空间 namespace: 默认情况下，模块内部的 action, mutation 和 getter 是注册在全局命名空间的
      关于命名空间： 如果我们直接提交 mutation 不添加模块的名字，而且模块中的 mutations 内容中具有相同名字的函数，并且这些模块都引入到了 index.js 中，那么在调用的时候不加模块的名字的话，模块中的 mutation 都会被触发。
      getters 也是同理的，多个模块都有同一个 getter, 默认读取的是根store 中的 getters, 如果根store 中没有，则按照模块注册顺序读取
      开启命名空间：可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有的 getters, action ,mutation 都会自动的根据模块注册的路径调整命名。namespaced:true 使用命名空间的时候，需要在 模块名.js 文件中加入关键字 namespaced:true, 使用的时候在 .vue文件中加入模块名
      2.5.3 访问全局内容： 在开启了命名空间的模块内部，也是可以访问到全局数据的



*/
