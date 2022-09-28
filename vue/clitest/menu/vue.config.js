const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{  // 配置跨域
        '/api':{
            target:"https://api.binstd.com/recipe",
            changeOrigin: true,   //  允许跨域
            pathRewrite:{
                '^/api':''   // 请求的时候使用这个 api 就可以
            }
        }
        
    }
}
})
