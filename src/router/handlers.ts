import { RouteLocationNormalized } from 'vue-router';
import { AxiosError } from 'axios';
import { useUserStore } from '@/stores/user';
import { getAuth0Client } from '@/services/auth0';
import { setValidLoginMethod } from '@/services/loginMethods';
import { generateRedirectionContent } from '@/services/redirections';

const handleLoginError = (loginError: AxiosError) => {
  const codeError = loginError.response?.data?.error?.code;
  if (codeError === 'invalid_login_method') {
    const validMethod = loginError?.response?.data?.error?.metadata?.validMethod;
    setValidLoginMethod(validMethod);
  }
};
// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  const auth0 = await getAuth0Client();

  try {
    await auth0.handleRedirectCallback();
    const user = await auth0.getUser();

    if (user && to.path.includes('signup')) {
      const name = user.given_name ?? user.name?.split(' ')[0];
      const lastName = user.family_name ?? user.name?.split(' ')[1];
      await userStore.createUser({
        id: user.sub,
        email: user.email,
        name,
        lastName,
      });
    }

    const token = await auth0.getTokenSilently();

    // eslint-disable-next-line no-underscore-dangle
    try {
      await userStore.logIn({ token });
    } catch (error) {
      handleLoginError(error as AxiosError);
    }

    return generateRedirectionContent();
  } catch { /* eslint-disable-line no-empty */ }
};
