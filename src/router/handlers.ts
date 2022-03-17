import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { exchangeCodeForToken } from '@/services/auth0';
import { generateToStoredRedirectionOrHomeContent } from '@/services/redirections';

// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.query.code) {
    const tokenData = await exchangeCodeForToken(to.query.code as string);
    await $userStore.logIn({ token: tokenData.idToken });
    return generateToStoredRedirectionOrHomeContent();
  }
};
