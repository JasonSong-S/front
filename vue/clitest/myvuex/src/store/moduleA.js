import moduleC from "./moduleC"
export default{
    namespaced:true,
    state:{
        text:'我是 moduleA 的数据'
    },
    mutations:{
        changeText(state){
            state.text="moduleA 中的数据改变了"
        }
    },
    modules:{
        moduleC
    }
}