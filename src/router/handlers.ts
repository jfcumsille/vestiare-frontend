import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { REDIRECT_QUERY_KEY } from '@/constants';
import { exchangeCodeForToken } from '@/services/auth0';

// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.query.code) {
    const tokenData = await exchangeCodeForToken(to.query.code as string);
    await $userStore.logIn({ token: tokenData.idToken });
    return { path: (to.query[REDIRECT_QUERY_KEY] as string) || '/' };
  }
};
