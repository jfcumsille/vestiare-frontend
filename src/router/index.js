import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import LogIn from '../views/log-in.vue';
import SignUp from '../views/sign-up.vue';
import Links from '../views/links.vue';
import NewLink from '../views/new-link.vue';
import ApiKeys from '../views/api-keys.vue';
import Dashboard from '../components/dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: LogIn,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next('dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/signup',
    component: SignUp,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next('dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next();
      } else {
        next('login');
      }
    },
  },
  {
    path: '/links',
    component: Links,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next();
      } else {
        next('login');
      }
    },
  },
  {
    path: '/links/new',
    component: NewLink,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next();
      } else {
        next('login');
      }
    },
  },
  {
    path: '/api-keys',
    component: ApiKeys,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next();
      } else {
        next('login');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
