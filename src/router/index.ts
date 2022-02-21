import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { REDIRECT_QUERY_KEY } from '@/constants';
import HomeView from '@/views/home/HomeView.vue';
import LogInView from '@/views/login/LogInView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/login', component: LogInView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  const $userStore = useUserStore();
  if (to.path !== '/login' && !$userStore.authenticated) {
    return { path: '/login', query: { [REDIRECT_QUERY_KEY]: to.path } };
  }
});

export default router;
