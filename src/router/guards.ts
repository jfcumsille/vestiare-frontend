import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeRedirection } from '@/services/redirections';

// eslint-disable-next-line consistent-return
export const loginRequired = (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.path !== '/login' && to.path !== '/signup' && !$userStore.authenticated) {
    storeRedirection(to.path);
    return { path: '/login' };
  }
};

// eslint-disable-next-line consistent-return
export const skipLogInIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.path === '/login' && $userStore.authenticated) {
    return { path: '/' };
  }
};

// eslint-disable-next-line consistent-return
export const skipSignUpIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.path === '/signup' && $userStore.authenticated) {
    return { path: '/' };
  }
};
