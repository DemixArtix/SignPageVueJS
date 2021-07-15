import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem('token');
      if(token) {
        next();
      } else {
        next({name: 'Sign In'})
      }
    }
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Login
  },
  {
    path: '/sign_up',
    name: 'Sign Up',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
