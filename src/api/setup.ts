import { useUserStore } from '@/stores/user';
import client from './client';

export const setupAPIAuthInterceptors = () => {
  client.interceptors.request.use((config) => {
    const $userStore = useUserStore();
    if ($userStore.authenticationHeaders) {
      // eslint-disable-next-line no-param-reassign
      config.headers = { ...config.headers, ...$userStore.authenticationHeaders };
    }
    return config;
  });
};
