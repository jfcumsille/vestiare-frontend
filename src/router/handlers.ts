import { useUserStore } from '@/stores/user';
import { getAuth0Client } from '@/services/auth0';
import { generateRedirectionContent } from '@/services/redirections';

// eslint-disable-next-line consistent-return
export const handleAuth0RedirectCallback = async () => {
  const userStore = useUserStore();
  const auth0 = await getAuth0Client();

  try {
    await auth0.handleRedirectCallback();
    const user = await auth0.getUser();

    if (user) {
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

    await userStore.logIn({ token });

    return generateRedirectionContent();
  } catch { /* eslint-disable-line no-empty */ }
};
