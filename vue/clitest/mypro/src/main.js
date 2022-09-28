/* 
main.js 是项目的文件入口
  所有写在 src 文件中的组件都必须被 main.js 包含，然后这个文件才会生效。
*/


import Vue from 'vue'     // 引入我们的 vue 文件（包） 
// 在 vue 中， 只要引入的路径下面没有 ./ ， 那么默认是从核心模块中引入
// 在 vue 中， 如果是从当前路径下引入的话，需要在前面添加 ./， 结合上条的信息，没有 ./ 的话，就是从核心模块引入
import App from './App.vue'   // 引入 App 组件， 在 vue 中，文件的结尾是 .vue 的话，那么这个文件就是一个组件
import router from './router'  // 如果直接写的是文件夹的名字，默认引入的是该文件夹下面的 index.js。  在这里表示的就是 import router from './router/index.js'

Vue.config.productionTip = false   // 关闭生产环境的错误提示

new Vue({
  router,     // 路由   es6 的写法 相当于 router:router
  render: h => h(App)  // 渲染组件的函数，相当于之前的 components
  // 等同于 h=>render(return h(App))
  // render: function(createElement){return createElement(App);}
}).$mount('#app')  // 提供一个挂载点，相当于 el 的作用，但是它是一个方法，可以通过主动调用，设置定时器



/* 
    1. node_modules:   核心模块
    2. public: 存放静态文件
    3. src: 最重要的文件， 我们编写的代码基本上都放在 src 目录下
    4. gitignore: git 上传需要忽略的文件格式
    5. babel.config.js: 主要用于在当前和较旧的浏览器或环境中将 es6 代码转化为 es5 ，向后兼容
    6. jsconfig.json: -jsconfig.json 文件指定根目录和 javaScript 服务提供的功能选项
    7. package-lock.json: 锁定安装模块的版本号
    8. package.json: 模块基本信息，依赖的模块，名称，版本号
    9. README.md: 对项目的主要信息进行描述
    10. main.js： 是项目的入口文件
*/

/* 
  关于 npm 安装
  1. npm install: 后面不直接跟包名，那么它会自动安装 package.json 中的依赖
  2. npm install 包名  --save--dev:  下载包并写入到开发依赖里面
  3. npm i 包名 -S  下载包并写入到生产依赖里面
  4. npm i 包名 -D  下载包并写入到开发依赖里面
  5. npm i 包名 --save  下载包并写入到生产依赖里面
  6. npm uninstall 包名: 卸载包
*/
