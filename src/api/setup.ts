import { useUserStore } from '@/stores/user';
import { getAuth0Client } from '@/services/auth0';
import client from './client';

type OptionalAuthHeaders = { Authorization: string } | Record<string, never>

const getAuthorizationHeadersOrEmptyObject = async (): Promise<OptionalAuthHeaders> => {
  const auth0 = await getAuth0Client();

  try {
    const token = await auth0.getTokenSilently();
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

export const setupAPIAuthInterceptors = () => {
  client.interceptors.request.use(async (config) => {
    const userStore = useUserStore();

    const authHeaders = await getAuthorizationHeadersOrEmptyObject();

    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      ...authHeaders,
    };

    if (userStore.organizationParams) {
      // eslint-disable-next-line no-param-reassign
      config.params = { ...config.params, ...userStore.organizationParams };
    }
    return config;
  });
};
