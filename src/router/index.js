import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import ChangePassword from '../views/change-password.vue';
import LogIn from '../views/log-in.vue';
import SignUp from '../views/sign-up.vue';
import RecoverPassword from '../views/recover-password.vue';
import Links from '../views/links.vue';
import NewLink from '../views/new-link.vue';
import RequestNewBank from '../views/request-new-bank.vue';
import ApiKeys from '../views/api-keys.vue';
import { validateQueryParams, redirectUrl } from '../helpers/widget_helper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: LogIn,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next('links');
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
        next('links');
      } else {
        next();
      }
    },
  },
  {
    path: '/recover-password',
    component: RecoverPassword,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next('links');
      } else {
        next();
      }
    },
  },
  {
    path: '/change-password',
    component: ChangePassword,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLoggedIn) {
        next('links');
      } else {
        next();
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
    path: '/request-new-bank',
    component: RequestNewBank,
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
  {
    path: '/widget',
    component: NewLink,
    props: { isWidget: true },
    beforeEnter(to, from, next) {
      if (validateQueryParams(to.query)) {
        next();
      } else {
        const url = redirectUrl(to.query);
        if (url) {
          window.location = url;
        } else {
          next('/');
        }
      }
    },
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
