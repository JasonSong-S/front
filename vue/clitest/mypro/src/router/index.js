/* 
1.路由： 路由是一种对应关系，它把路径和视图对应起来了
  因为 vue 是一个单页面应用，通过路由的方式切换视图或者组件

2. 路由的安装 
  npm install vue-router
  // 安装指定的版本
  npm install vue-router@3.2.0

3. 使用步骤
  1. 从核心模块引入 vue, vue-router
  2. 通过 Vue.use() 方法 注册 VueRouter
  3. 定义路由配置项，包括 path, name, component
  4. 创建 VueRouter 实例， 传入配置项
  5. 通过 <router-view></router-view> 标签渲染路由视图， 在 App.vue 组件中进行渲染


4. 路由的两个核心
  1. 定义路由配置项
  2. 定义路由视图的显示位置 <router-view>

  路径定义规则：路径以斜线打头
  页面与路由一定是一一对应的，一个页面一定要对应路由，否则找不到
  路由的懒加载：  component: ()=> import('../views/About.vue') 懒加载是用到的时候再进行加载，没有用到的时候不加载。相对于直接引入的方式提高了性能。

5. 路径的写法  import Abc from './demo'
  1. 如果当前目录下面有 demo 文件夹，那么引入的是 demo 文件夹下面的 index.js
  2. 如果当前目录下面没有 demo 文件夹，会首先去寻找当前目录下面的 demo.vue 文件
  3. 如果不存在 demo.vue 文件，那么会去寻找当前目录下面的 demo.js 文件
  4. 按道理应该使用全路径的方式，这样的规则本质上是因为 webpack 已经配置了相应的规则
  5. 路径中 @ 代表的是 src 目录， 本质上是因为 webpack 配置了


6. 嵌套路由
  1. 如果路由内部还有路由，那么需要在路由的配置项没添加关键字 children， children 内部的内容同其他路由的内容一样，包括 path, component。并且子路由内部还可以嵌套子路由，理论上可以进行无限的嵌套
  2. 路由内部还有一个关键字是 name , 它的作用是给路径取一个名字，可以用来跳转， 但是要求 name 不能重名
  3. 每一级路由必须要有该路由的 <router-view>
  4. 哪个组件还有子路由，那么需要在该组件内部定义 router-view， 代表该组件的子路由显示在该位置上
  5. 子路由的配置，定义在父路由的 children 属性下面，配置项的内容同父路由
  6. 子路由的路径如果没有添加斜线，那么默认是在上级路由上进行叠加。

7. 路由的跳转
  0.this.$router   根路由实例
  0.this.$route    当前路由实例
  1. js 形式的跳转
    如果看到了某个方法是 $ 开头的，基本可以断定，该方法是 Vue 实例的方法
        this.$router.push(字符串路径)
        router.push({path:'home'})
        router.push({name:'user'})
  2. 标签形式的跳转
    <router-link to="/about"></router-link>
    to 可以是字符串路径，  还可以是对象  :to="{path:"路径"}"  :to="{name:"名字"}"

  3. 浏览器的跳转
    1. 在浏览器的记录中前进一步，等同于 history.forward()
    router.go(1)
    2. 在浏览器的记录中后退一步，等同于 history.back()
    router.go(-1)
    3. 前进3步
    router.go(3)
    4. 如果 history 的记录不够用, 那么会失败
    router.go(100)
    router.go(-100)


8. 动态路由：多个路由匹配同一个页面
      动态路由匹配， 在路径后面添加 /: 名字
        如：{path：'users/:id',component:user}
        可以同时存在多个路由
          {path:'users/:id/:no',component:user}
      注意：只是修改动态路由后面的动态路径参数是不会触发组件的生命周期的
      但是如果页面中用到了动态路由的数据，那么切换动态路径的时候，是会触发组件更新的生命周期的

      动态路由的跳转：
        1. router.push({name:'user',params:{userid:'123'}})
        2. router.push({path:'/user/123'})
        3. router.push({'/user/123'})
        // 下面的写法是错误的
        router.push({path:'/user',params:{userid:'123'}})  // 如果提供了 path,  params 会被忽略
        // 因为这里的 path 可以是动态路径，如果后面再有 params， 那么会引发冲突，不知道路径究竟指向哪里
        4. 同样的规则适用于 <router-link></router-link>

  9. 查询参数： 用于跨组件传输数据，跳转的时候直接在地址后面拼接  ?key=value，如果有多个数据，使用 & 连接， 如 ?key=value&key=value

      router.push({path:'/register', query:{plan:'private'}})
      router.push({path:'register?key=value'})
      router.push('/register?key=value')

    注意： name 和 params 配套
           path 和 query 配套

  10. 捕获所有路由 ，使用通配符 *, 并且可以指定以什么开头 
    {
      path:'*'  // 会匹配所有的路径
    }

    {
      path:'user-*'  // 会匹配以 user- 开头的所有的路径
    }

    当使用通配符的路由时，请确保路由的顺序是正确的，通常将含有通配符的路由放在最后

  11. 组件路由对象
      在组件中通过 this.$route 拿到当前组件的路由信息
      {name:"组件的名字", fullPath:'完整路径', path:'路径',  matched:[匹配上的所有路由],
    meta:'路由元信息', params: "动态路径参数"，  query:"查询参数"}


  12. 重定向和别名
    重定向：当用户访问 /a 时， URL 将会被替换为 /b， 然后匹配的路由为 /b, 
    
    使用方法为   redirect: "要跳转的路径"， （在路由配置项中）
    重定向的目标也可以是一个命名的路由：  redirect:{name:'foo'}

    别名：/a 的别名是 /b, 当用户访问 /b 的时候， URL 会保持为 /b, 但是路由匹配为 /a, 就像用户访问 /a 一样

    使用方法： alias:"/b"

    别名的功能让你可以自由的将 UI 结构映射到任意的 URL, 而不是受限于配置的嵌套路由结构

  13. 路由组件传参

    可以将 params 直接映射到组件的属性中

    1. 不使用 params 的作法：
      const user = {
        template:`<div>user {{$route.params.id}}</div>`
      };

      const router = new VueRouter({
        routes:[{path:'/user/:id', components:user}]
      });

    2. 使用 params 组件传参的方法：
      const user = {
        props:['id','num'],
        template:`<div>user {{id}} {{num}}</div>`
      };


      const router = new VueRouter({
        routes:[{path:'/user/:id/:num', components:user, props:true}]
      });

  14. 路由模式：
      hash 模式 和 history 模式
      1.当使用 history 模式的时候， URL 就像正常的 url，比较好看，但是这种模式需要后台的支持，因为我们的应用是单页的客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问前端定义的页面路由的时候，就会返回404， 因为在前端定义的页面路由在后台的服务器上是不存在的，解决的办法是需要后端配置 nginx, 在服务端增加一个覆盖所有情况的候选资源，如果 URL 匹配不到任何的静态资源，则应该返回一个 index.html 页面，这个页面就是你的 app 依赖的页面
      2. hash 模式的标志是 路径中含有 # , 并且这个 # 是不能删除的
      3. mode: 在路由配置项中更改路由的模式

  15. 导航/路由守卫
      1. 全局前置守卫
        const router = new VueRouter({...});

        router.beforeEach((to,from,next)=>{})
          to:Route : 即将要进入的目标路由对象
          from:Route: 当前导航正要离开的路由
          next:Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
            1.next(): 进行管道中的下一个钩子，如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
            2.next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者是浏览器的后退按钮），那么 URL 地址会重置到 from 路由对应的地址
            3.next('/')或者 next({path:'/'})：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航，你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、 name:'home' 之类的选项以及任何用在 route-link 的 to  prop 或 router.push 中的选项
            4.next(error):如果传入 next 的参数是一个 error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
            5.路由守卫要避免死循环，即一定要有 next()

        2. 全局解析守卫：
          可以使用 router.beforeResolve 注册一个全局守卫，这和 router.beforeEach类似，区别是导航被确认之前，同时在所有组件内守卫和所有异步路由组件被解析之后，解析守卫就可以被调用了。

        3. 全局后置钩子：和守卫不同的是，这些钩子不会接受 next 函数，也不会改变导航本身。
          router.afterEach((to,from)=>{})
        4. 路由独享的守卫
          export default{
            mounted(){
              console.log(this.$route)
            },
            beforeRouteEnter(to,from,next){
              // 在渲染该组件对应的路由被 confirmed 前被调用
              // 不！能！ 获取组件实例 this
              // 因为当守卫执行前，组件实例还没有被创建
            },
            beforeRouteUpdate(to, from, next){
              // 在当前组件改变，该组件被复用时调用
              // 举例来说，对于一个带有动态参数的路径 /foo/:id， 在 /foo/1 和 /foo/2 之间跳转的时候
              // 由于渲染相同的组件 Foo, 因此组件实例会被复用，而这个钩子就会在这个情况下被调用
              // 可以访问组件实例 this
            }，
            beforeRouteLeave(to,from,next){
              // 导航离开该组件的对应路由时调用
              // 可以访问组件实例 this
            }
          }

  16. 完整的导航解析流程
      1.导航被触发
      2.在失活的组件中调用 beforeRouteLeave 守卫
      3.调用全局的 beforeEach 守卫
      4.在重用的组件里调用 beforeRouteUpdate 守卫
      5.在路由配置里调用 beforeEnter
      6.解析异步路由组件
      7.在被激活的组件里调用 beforeRouteEnter
      8.调用全局的 beforeResolve 守卫
      9.导航被确认
      10.调用全局的 afterEach 钩子
      11.触发 DOM 更新
      12.调用 beforeRouteEnter 守卫中传给 next 的回调函数,创建好的组件实例会作为回调函数的参数传入

  17. 路由元信息：
        定义路由的时候可以配置 meta 字段
        meta 可以设置一些跟当前路由相关的一些自定义信息，比如页面标题，页面权限等。

  18.滚动行为：
      const router = new VueRouter({
        scrollBehavior(to,from,savedPosition){
          //to from 是路由对象
          // return 期望滚动到哪个位置, x 是离左边的距离， y 是离顶部的距离
          //有滚动条的条件下才生效，没有滚动条不生效。 
          

          return {x:0,y:1000}
        }
      });


*/


import Vue from 'vue'   // 引入核心组件
import VueRouter from 'vue-router'   // 引入核心组件
import MyHome from '../views/MyHome'
// import MyAbout from '../views/MyAbout'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)   // 注册组件， use 方法是专门给 vue 配套的插件如 vue-router vuex 注册组件使用的，注册之后这个组件才能使用。



// 定义配置项
const routes = [
    {
      path:'/home',
      component:MyHome,
      children:[{
        path:'/home/about',
        component:()=>import('@/views/MyAbout')   // 路由懒加载的方法
      }]
    },
    {
      path:'/login',
      name:'aaa',
      component:()=>import('../views/MyLogin')
    }
]

// 创建一个 VueRouter 实例，传入配置项
const router = new VueRouter({
  routes
})


// 导出实例   在 main.js 引入
export default router
