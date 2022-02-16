import { createStore } from 'vuex'

export default createStore({
  state: {
     path:'',
   // 图片详情
      item:{},
      bbflag:false,
  },
  mutations: {
     setpath(state,a){
        state.path=a
     },
     setItem(state,b){
         state.item=b
     },
     setBflag(state,fz){
        state.bbflag=fz
     }
  },
  actions: {
  },
  modules: {
  }
})
