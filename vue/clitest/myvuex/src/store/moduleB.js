export default{
    state:{
        text:'我是 moduleB 的数据'
    },
    mutations:{
        changeText(state){
            state.text="moduleB 中的数据改变了"
        }
    },
}