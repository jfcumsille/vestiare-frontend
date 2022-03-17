import { Router } from 'vue-router';
import { useRouterStore } from '@/stores/router';

export const enableLoader = (router: Router) => {
  router.beforeEach(() => {
    const routerStore = useRouterStore();
    routerStore.loading = true;
  });
};

export const disableLoader = (router: Router) => {
  router.afterEach(() => {
    const routerStore = useRouterStore();
    routerStore.loading = false;
  });
};
