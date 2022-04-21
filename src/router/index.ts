import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import ResetPasswordView from '@/views/login-signup/ResetPasswordView.vue';
import ApiKeysView from '@/views/apiKeys/ApiKeysView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import DetailedWebhookEndpointView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

import { enableLoader, disableLoader } from './loader';
import {
  loadUser,
  loginRequired,
  skipLogInIfAlreadyLoggedIn,
  skipSignUpIfAlreadyLoggedIn,
  skipResetPasswordIfAlreadyLoggedIn,
} from './guards';
import { handleAuth0RedirectCallback } from './handlers';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: () => ({ path: '/links' }) },
  {
    path: '/login/oauth',
    component: LogInView,
    beforeEnter: handleAuth0RedirectCallback,
  },
  {
    path: '/signup/oauth',
    component: SignUpView,
    beforeEnter: handleAuth0RedirectCallback,
  },
  {
    path: '/login',
    component: LogInView,
    beforeEnter: skipLogInIfAlreadyLoggedIn,
  },
  {
    path: '/signup',
    component: SignUpView,
    beforeEnter: skipSignUpIfAlreadyLoggedIn,
  },
  {
    path: '/reset',
    component: ResetPasswordView,
    beforeEnter: [
      skipResetPasswordIfAlreadyLoggedIn,
    ],
  },
  { path: '/api-keys', component: ApiKeysView },
  { path: '/links', component: LinksView },
  { path: '/webhook-endpoints', component: WebhookEndpointsView },
  {
    path: '/webhook-endpoints/:webhookEndpointId',
    component: DetailedWebhookEndpointView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

enableLoader(router);

router.beforeEach(loadUser);
router.beforeEach(loginRequired);

disableLoader(router);

export default router;
