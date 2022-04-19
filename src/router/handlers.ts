import { useUserStore } from '@/stores/user';
import { getAuth0Client } from '@/services/auth0';
import { generateRedirectionContent } from '@/services/redirections';

// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async () => {
  const userStore = useUserStore();
  const auth0 = await getAuth0Client();

  try {
    await auth0.handleRedirectCallback();

    const token = await auth0.getTokenSilently();

    // eslint-disable-next-line no-underscore-dangle
    await userStore.logIn({ token });

    return generateRedirectionContent();
  } catch { /* eslint-disable-line no-empty */ }
};
