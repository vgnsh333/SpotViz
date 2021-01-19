import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerShow : false,
    footerShow : true,
    userName:'',
    userImage:'https://randomuser.me/api/portraits/men/85.jpg'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
