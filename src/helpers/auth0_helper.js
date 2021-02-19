import crypto from 'crypto';

const AUTH0_CLIENT_ID = process.env.VUE_APP_AUTH0_CLIENT_ID;
const BASE_AUTH0_URI = `https://${process.env.VUE_APP_AUTH0_DOMAIN}`;
const REDIRECT_URI = process.env.VUE_APP_BASE_HOST;

function base64URLEncode(str) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

function generateVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}

function generateChallenge(verifier) {
  return base64URLEncode(sha256(verifier));
}

function oauthJWTPayload(code, verifier) {
  return {
    grant_type: 'authorization_code',
    client_id: AUTH0_CLIENT_ID,
    code_verifier: verifier,
    code,
    redirect_uri: REDIRECT_URI,
  };
}

function authorizationUri(callbackPath, challenge, connection) {
  const params = {
    response_type: 'code',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: `${REDIRECT_URI}/${callbackPath}`,
    scope: 'openid profile email',
    connection,
  };

  return `${BASE_AUTH0_URI}/authorize?${new URLSearchParams(params).toString()}`;
}

export default {
  BASE_AUTH0_URI,
  oauthJWTPayload,
  generateVerifier,
  generateChallenge,
  authorizationUri,
};
