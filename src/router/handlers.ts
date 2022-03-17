import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { exchangeCodeForToken } from '@/services/auth0';
import { generateRedirectionContent } from '@/services/redirections';

// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async (to: RouteLocationNormalized) => {
  const $userStore = useUserStore();
  if (to.query.code) {
    if (to.path === '/login') {
      const tokenData = await exchangeCodeForToken(to.query.code as string, 'login');
      await $userStore.logIn({ token: tokenData.idToken });
    } else {
      const tokenData = await exchangeCodeForToken(to.query.code as string, 'signup');
      await $userStore.signUp({ token: tokenData.idToken });
    }
    return generateRedirectionContent();
  }
};
