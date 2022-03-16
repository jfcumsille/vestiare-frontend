import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import ResetPasswordView from '@/views/login-signup/ResetPasswordView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import DetailedWebhookEndpointView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

import { enableLoader, disableLoader } from './loader';
import {
  loginRequired,
  skipLogInIfAlreadyLoggedIn,
  skipSignUpIfAlreadyLoggedIn,
  skipResetPasswordIfAlreadyLoggedIn,
} from './guards';
import { handleAuth0RedirectCallback } from './handlers';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: () => ({ path: '/links' }) },
  {
    path: '/login',
    component: LogInView,
    beforeEnter: [
      skipLogInIfAlreadyLoggedIn,
      handleAuth0RedirectCallback,
    ],
  },
  {
    path: '/signup',
    component: SignUpView,
    beforeEnter: [
      skipSignUpIfAlreadyLoggedIn,
      handleAuth0RedirectCallback,
    ],
  },
  {
    path: '/reset',
    component: ResetPasswordView,
    beforeEnter: [
      skipResetPasswordIfAlreadyLoggedIn,
    ],
  },
  { path: '/links', component: LinksView },
  { path: '/webhook_endpoints', component: WebhookEndpointsView },
  {
    path: '/webhook_endpoints/:webhookEndpointId',
    component: DetailedWebhookEndpointView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

enableLoader(router);

router.beforeEach(loginRequired);

disableLoader(router);

export default router;
