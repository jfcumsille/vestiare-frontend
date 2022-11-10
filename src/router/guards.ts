import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useOrganizationStore } from '@/stores/organization';
import { getAuth0Client } from '@/services/auth0';
import { storeRedirection } from '@/services/redirections';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  PASSWORD_RESET_ROUTE,
  OAUTH_LOGIN_ROUTE,
  OAUTH_SIGNUP_ROUTE,
  INVITATION_ROUTE_STARTS_WITH,
} from '@/constants/router';

export const removeTrailingSlash = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) => (to.path.endsWith('/') ? next(to.path.replace(/\/$/, '')) : next());

const tryToLoadUserWithNoError = async () => {
  const auth0 = await getAuth0Client();
  const userStore = useUserStore();

  try {
    await auth0.getTokenSilently();
    await userStore.loadUser();
  } catch { } // eslint-disable-line no-empty
};

export const loadUser = async (to: RouteLocationNormalized) => {
  if (
    to.path !== OAUTH_LOGIN_ROUTE
    && to.path !== OAUTH_SIGNUP_ROUTE
    && to.path !== PASSWORD_RESET_ROUTE
  ) {
    const userStore = useUserStore();

    if (!userStore.authenticated) {
      await tryToLoadUserWithNoError();
    }
  }
};

// eslint-disable-next-line consistent-return
export const loginRequired = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (
    to.path !== LOGIN_ROUTE && to.path !== SIGNUP_ROUTE
    && to.path !== OAUTH_LOGIN_ROUTE && to.path !== OAUTH_SIGNUP_ROUTE
    && to.path !== PASSWORD_RESET_ROUTE && !to.path.startsWith(INVITATION_ROUTE_STARTS_WITH)
    && !userStore.authenticated
  ) {
    storeRedirection(to.path);
    return { path: LOGIN_ROUTE };
  }
};

// eslint-disable-next-line consistent-return
export const skipLogInIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === LOGIN_ROUTE && userStore.authenticated) {
    return { path: HOME_ROUTE };
  }
};

// eslint-disable-next-line consistent-return
export const skipSignUpIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === SIGNUP_ROUTE && userStore.authenticated) {
    return { path: HOME_ROUTE };
  }
};

// eslint-disable-next-line consistent-return
export const skipResetPasswordIfAlreadyLoggedIn = (to: RouteLocationNormalized) => {
  const userStore = useUserStore();
  if (to.path === PASSWORD_RESET_ROUTE && userStore.authenticated) {
    return { path: HOME_ROUTE };
  }
};

// eslint-disable-next-line consistent-return
export const skipPaymentsIfUnauthorizedOrg = async () => {
  const organizationStore = useOrganizationStore();
  await organizationStore.loadOrganization();
  if (!organizationStore.showPaymentsTab) {
    return { path: HOME_ROUTE };
  }
};
