import axiosInstance from './config';
import auth0Helper from '../helpers/auth0_helper';

function getOAuthJWT(code, verifier) {
  const payload = new URLSearchParams(auth0Helper.oauthJWTPayload(code, verifier));

  return axiosInstance.post(`${auth0Helper.BASE_AUTH0_URI}/oauth/token`, payload.toString(), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

export default {
  getOAuthJWT,
};
