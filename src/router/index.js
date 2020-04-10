import Vue from 'vue';
import VueRouter from 'vue-router';
import LogIn from '../views/log-in.vue';
import SignUp from '../views/sign-up.vue';
import Links from '../components/links.vue';
import ApiKeys from '../components/api-keys.vue';
import Dashboard from '../components/dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    component: LogIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/links',
    component: Links,
  },
  {
    path: '/api-keys',
    component: ApiKeys,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
