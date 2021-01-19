import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import callback from '../views/callback.vue'
import User from '../views/User.vue'
import visualizer from '../views/visualizer.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/callback*',
    name: 'callback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: callback
  },
  {
    path:'/user',
    name:'User',
    component : User
  },
  {
    path:'/visualizer',
    name:'Visualize',
    component:visualizer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
