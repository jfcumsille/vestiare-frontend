import { WebAuth } from 'auth0-js';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import {
  AUTH0_DOMAIN, AUTH0_CLIENT_ID, USERNAME_PASSWORD_CONNECTION, BASE_API_HOST,
} from '@/constants/api';
import { Auth0User } from '@/interfaces/entities/user';
import { SignUpOptions } from '@/interfaces/options/account';
import { Auth0Database } from '@/interfaces/utilities/enums';
import { Nullable } from '@/interfaces/common';

export const webAuth = new WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
});

let internalAuth0 = <Nullable<Auth0Client>>null;

export const getAuth0Client = async () => {
  if (internalAuth0 === null) {
    internalAuth0 = await createAuth0Client({
      domain: AUTH0_DOMAIN,
      client_id: AUTH0_CLIENT_ID,
      audience: BASE_API_HOST,
      useRefreshTokens: true,
    });
  }
  return internalAuth0;
};

export const authenticateWithRedirect = async (
  connection: Auth0Database,
  mode: 'login' | 'signup',
) => {
  const auth0 = await getAuth0Client();

  return auth0.loginWithRedirect({
    connection,
    redirect_uri: `${window.location.origin}/${mode}/oauth`,
  });
};

export const logout = async () => {
  const auth0 = await getAuth0Client();

  return auth0.logout({
    returnTo: window.location.origin,
  });
};

export const manualSignup = ({
  email, password, name, lastName, company, country,
}: SignUpOptions) => new Promise<Auth0User>((resolve, reject) => {
  webAuth.signup({
    connection: USERNAME_PASSWORD_CONNECTION,
    email: email || '',
    password: password || '',
    // @ts-expect-error: Type definitions for DbSignUpOptions type are incomplete
    given_name: name,
    family_name: lastName,
    user_metadata: {
      company,
      country,
    },
  }, (error, user: Auth0User) => {
    if (!error) {
      resolve(user);
    } else {
      reject(error);
    }
  });
});
