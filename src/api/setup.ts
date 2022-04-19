import { useUserStore } from '@/stores/user';
import { getAuth0Client } from '@/services/auth0';
import client from './client';

export const setupAPIAuthInterceptors = () => {
  client.interceptors.request.use(async (config) => {
    const auth0 = await getAuth0Client();
    const $userStore = useUserStore();

    let authHeaders = {};

    try {
      const token = await auth0.getTokenSilently();
      authHeaders = { Authorization: `Bearer ${token}` };
    } catch { } // eslint-disable-line no-empty

    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      ...authHeaders,
    };

    if ($userStore.organizationParams) {
      // eslint-disable-next-line no-param-reassign
      config.params = { ...config.params, ...$userStore.organizationParams };
    }
    return config;
  });
};
