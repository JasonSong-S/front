import Vue from 'vue'
import Vuex from 'vuex'
import {get} from "@/utils/http"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    role:""
  },
  getters: {
  },
  mutations: {
    setRow(state,payload){
      state.row = payload
    },
    clearRow(state){
      state.row = {}
    },
    setRole(state,payload){
      state.role = payload
    }
  },
  actions: {
    async getRole({commit}){
      let {role} =await get("/getRole")
      commit("setRole",role)
    }
  },
  modules: {
  }
})
