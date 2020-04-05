import Vue from 'vue';
import VueRouter from 'vue-router';
import LogIn from '../views/LogIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: LogIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
