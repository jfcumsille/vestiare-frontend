import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import DetailedWebhookEndpointView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

import { loginRequired, skipLogInIfAlreadyLoggedIn, skipSignUpIfAlreadyLoggedIn } from './guards';
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

router.beforeEach(loginRequired);

export default router;
