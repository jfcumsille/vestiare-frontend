import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeRedirection } from '@/services/redirections';

export const loadUser = async (to: RouteLocationNormalized) => {
  if (to.path !== '/login/oauth' && to.path !== '/signup/oauth' && to.path !== '/reset') {
    const userStore = useUserStore();

    if (!userStore.authenticated) {
      try {
        await userStore.loadUser();
      } catch { } // eslint-disable-line no-empty
    }
  }
};

// eslint-disable-next-line consistent-return
export const loginRequired = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (
    to.path !== '/login' && to.path !== '/signup'
    && to.path !== '/login/oauth' && to.path !== '/signup/oauth'
    && to.path !== '/reset' && !userStore.authenticated
  ) {
    storeRedirection(to.path);
    return { path: '/login' };
  }
};

// eslint-disable-next-line consistent-return
export const skipLogInIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === '/login' && userStore.authenticated) {
    return { path: '/' };
  }
};

// eslint-disable-next-line consistent-return
export const skipSignUpIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === '/signup' && userStore.authenticated) {
    return { path: '/' };
  }
};

// eslint-disable-next-line consistent-return
export const skipResetPasswordIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === '/reset' && userStore.authenticated) {
    return { path: '/' };
  }
};
