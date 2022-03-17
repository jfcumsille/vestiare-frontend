import axios from 'axios';
import { useStorage } from '@vueuse/core';
import { camelizeKeys } from 'humps';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@/constants/api';
import { OAuthToken } from '@/interfaces/responses/auth0';

// Most of the helper methods in this file are practically a
// copy of Auth0's own SDK methods
// https://github.com/auth0/auth0-spa-js/blob/bb70a9a9cd392cf25525f654b974b60ee0720922/src/utils.ts

const createRandomString = () => {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.';
  const randomValues = Array.from(
    window.crypto.getRandomValues(new Uint8Array(43)),
  );
  const random = randomValues.map((v) => charset[v % charset.length]);
  return random.reduce((prev, curr) => prev + curr, '');
};

const sha256 = (value: string) => window.crypto.subtle.digest(
  { name: 'SHA-256' },
  new TextEncoder().encode(value),
);

const urlEncodeB64 = (input: string) => {
  const b64Chars: { [index: string]: string } = { '+': '-', '/': '_', '=': '' };
  return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
};

const bufferToBase64UrlEncoded = (input: number[] | Uint8Array | ArrayBuffer) => {
  const ie11SafeInput = new Uint8Array(input);
  return urlEncodeB64(
    window.btoa(String.fromCharCode(...Array.from(ie11SafeInput))),
  );
};

const buildAuthorizationUri = (
  challenge: string,
  connection: 'github' | 'google-oauth2',
  mode: 'login' | 'signup',
) => {
  const params = {
    response_type: 'code',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: `${window.location.origin}/${mode}`,
    scope: 'openid profile email',
    connection,
  };

  return `https://${AUTH0_DOMAIN}/authorize?${new URLSearchParams(params).toString()}`;
};

const buildOAuthJWTBody = (
  code: string,
  verifier: string,
  mode: 'login' | 'signup',
) => ({
  grant_type: 'authorization_code',
  client_id: AUTH0_CLIENT_ID,
  code_verifier: verifier,
  code,
  redirect_uri: `${window.location.origin}/${mode}`,
});

export const loginWithRedirect = async (
  connection: 'github' | 'google-oauth2',
  mode: 'login' | 'signup',
) => {
  const codeVerifier = useStorage('code-verifier', '');
  codeVerifier.value = createRandomString();

  const codeChallengeBuffer = await sha256(codeVerifier.value);
  const codeChallenge = bufferToBase64UrlEncoded(codeChallengeBuffer);

  const authorizationUri = buildAuthorizationUri(codeChallenge, connection, mode);

  window.location.href = authorizationUri;
};

export const exchangeCodeForToken = async (
  code: string,
  mode: 'login' | 'signup',
): Promise<OAuthToken> => {
  const codeVerifier = useStorage('code-verifier', '');
  const oAuthJWTBody = buildOAuthJWTBody(code, codeVerifier.value, mode);
  codeVerifier.value = null;
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, oAuthJWTBody);
  return camelizeKeys(response.data) as unknown as OAuthToken;
};
