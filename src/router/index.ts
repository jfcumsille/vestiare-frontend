import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import LogInView from '@/views/login/LogInView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhooksView from '@/views/webhooks/WebhooksView.vue';

import { loginRequired, skipLogInIfAlreadyLoggedIn } from './guards';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/login', component: LogInView },
  { path: '/links', component: LinksView },
  { path: '/webhooks', component: WebhooksView },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(loginRequired);
router.beforeEach(skipLogInIfAlreadyLoggedIn);

export default router;
