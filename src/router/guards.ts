import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { REDIRECT_QUERY_KEY } from '@/constants';

// eslint-disable-next-line consistent-return
export const loginRequired = (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.path !== '/login' && to.path !== '/signup' && !$userStore.authenticated) {
    return { path: '/login', query: { [REDIRECT_QUERY_KEY]: to.path } };
  }
};

// eslint-disable-next-line consistent-return
export const skipLogInIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.path === '/login' && $userStore.authenticated) {
    return { path: '/' };
  }
};
