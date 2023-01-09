import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{}
  },
  getters: {
  },
  mutations: {
    setRow(state,payload){
      state.row = payload
    },
    clearRow(state){
      state.row = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
