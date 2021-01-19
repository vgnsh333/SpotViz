import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import AxiosPlugin from 'vue-axios-cors';
import VueSpotify from 'vue-spotify'
import Spotify from 'spotify-web-api-node'

Vue.use(VueAxios,Axios);
Vue.use(AxiosPlugin);
Vue.use(VueSpotify, new Spotify())
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
