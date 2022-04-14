import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@/constants/api';
import { Nullable } from '@/interfaces/common';

let internalAuth0 = <Nullable<Auth0Client>>null;

export const getAuth0Client = async () => {
  if (internalAuth0 === null) {
    internalAuth0 = await createAuth0Client({
      domain: AUTH0_DOMAIN,
      client_id: AUTH0_CLIENT_ID,
      useRefreshTokens: true,
    });
  }
  return internalAuth0;
};

export const authenticateWithRedirect = async (
  connection: 'github' | 'google-oauth2',
  mode: 'login' | 'signup',
) => {
  const auth0 = await getAuth0Client();

  return auth0.loginWithRedirect({
    connection,
    redirect_uri: `${window.location.origin}/${mode}`,
  });
};

export const logout = async () => {
  const auth0 = await getAuth0Client();

  return auth0.logout({
    returnTo: window.location.origin,
  });
};
