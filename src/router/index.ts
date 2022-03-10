import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import DetailedWebhookEndpointView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

import { loginRequired, skipLogInIfAlreadyLoggedIn } from './guards';
import { handleAuth0RedirectCallback } from './handlers';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  {
    path: '/login',
    component: LogInView,
    beforeEnter: handleAuth0RedirectCallback,
  },
  { path: '/signup', component: SignUpView },
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
router.beforeEach(skipLogInIfAlreadyLoggedIn);

export default router;
