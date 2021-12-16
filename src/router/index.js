import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import ConfirmEmail from '../views/confirm-email.vue';
import ConfirmationFailure from '../views/confirmation-failure.vue';
import ChangePassword from '../views/change-password.vue';
import LogIn from '../views/log-in.vue';
import SignUp from '../views/sign-up.vue';
import RecoverPassword from '../views/recover-password.vue';
import Links from '../views/links.vue';
import NewLink from '../views/new-link.vue';
import Webhooks from '../views/webhooks.vue';
import WidgetIframe from '../views/widget-iframe.vue';
import UserProfile from '../views/user-profile.vue';
import RequestNewBank from '../views/request-new-bank.vue';
import ApiKeys from '../views/api-keys.vue';
import Error from '../views/error.vue';
import UnavailableCountry from '../views/UnavailableCountry.vue';
import { validateQueryParams } from '../helpers/widget_helper';

Vue.use(VueRouter);

const guardLogin = (to, from, next) => {
  if (store.getters.isUserLoggedIn) {
    next();
  } else {
    next('login');
  }
};

const guardApp = (to, from, next) => {
  if (store.getters.isUserLoggedIn) {
    next('links');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/login',
    component: LogIn,
    beforeEnter: guardApp,
  },
  {
    path: '/signup',
    component: SignUp,
    beforeEnter: guardApp,
  },
  {
    path: '/recover-password',
    component: RecoverPassword,
    beforeEnter: guardApp,
  },
  {
    path: '/change-password',
    component: ChangePassword,
    beforeEnter: guardApp,
  },
  {
    path: '/confirm-email',
    component: ConfirmEmail,
    beforeEnter: guardApp,
  },
  {
    path: '/confirm-email/failed',
    component: ConfirmationFailure,
    beforeEnter: guardApp,
  },
  {
    path: '/links',
    component: Links,
    beforeEnter: guardLogin,
  },
  {
    path: '/links/new',
    component: NewLink,
    beforeEnter: guardLogin,
  },
  {
    path: '/webhooks',
    component: Webhooks,
    beforeEnter: guardLogin,
  },
  {
    path: '/webhooks/:id',
    component: Webhooks,
    beforeEnter: guardLogin,
  },
  {
    path: '/user-profile',
    component: UserProfile,
    beforeEnter: guardLogin,
  },
  {
    path: '/request-new-bank',
    component: RequestNewBank,
    beforeEnter: guardLogin,
  },
  {
    path: '/api-keys',
    component: ApiKeys,
    beforeEnter: guardLogin,
  },
  {
    path: '/widget',
    component: NewLink,
    props: { isWidget: true },
    beforeEnter(to, from, next) {
      const validationResult = validateQueryParams(to.query);
      if (validationResult.valid) {
        next();
      } else {
        next({ name: 'error', params: { isWidget: true, error: validationResult.error } });
      }
    },
  },
  {
    path: '/widget-iframe',
    component: WidgetIframe,
    beforeEnter(to, from, next) {
      const validationResult = validateQueryParams(to.query);
      if (validationResult.valid) {
        next();
      } else {
        next({ name: 'error', params: { isWidget: true, error: validationResult.error } });
      }
    },
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    props: true,
  }, {
    path: '/unavailable-country',
    name: 'unavailable-country',
    component: UnavailableCountry,
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
