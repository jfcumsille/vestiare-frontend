import {
  afterAll, beforeAll, describe, expect, it, vi,
} from 'vitest';
import { Auth0Client } from '@auth0/auth0-spa-js';
import {
  getAuth0Client, authenticateWithRedirect, logout, manualSignup, webAuth,
} from '@/services/auth0';
import { mockCrypto } from '@/utils/tests/crypto';
import { USERNAME_PASSWORD_CONNECTION } from '@/constants/api';

describe('auth0 service', () => {
  beforeAll(() => {
    vi.mock('@auth0/auth0-spa-js', () => {
      const clientMock = vi.fn(() => ({
        loginWithRedirect: vi.fn(),
        logout: vi.fn(),
      }));

      return {
        default: clientMock,
        Auth0Client: clientMock,
      };
    });

    vi.mock('auth0-js', () => ({
      WebAuth: vi.fn(() => ({
        signup: vi.fn((params, callback) => callback(null, params)),
      })),
    }));
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  afterAll(() => {
    vi.unmock('@auth0/auth0-spa-js');
    vi.unmock('auth0-js');
  });

  describe('getAuth0Client', () => {
    it('returns an instance of \'Auth0Client\'', async () => {
      await getAuth0Client();

      expect(vi.mocked(Auth0Client).mock.calls.length).toBe(1);
    });
  });

  describe('authenticateWithRedirect', () => {
    const params = [
      ['github', 'login'],
      ['github', 'signup'],
      ['google-oauth2', 'login'],
      ['google-oauth2', 'signup'],
      ['username-password-staging', 'login'],
      ['username-password-staging', 'signup'],
      ['username-password-production', 'login'],
      ['username-password-production', 'signup'],
    ] as Array<['github' | 'google-oauth2' | 'username-password-staging' | 'username-password-production', 'login' | 'signup']>;
    it.each(params)('redirects using the %s connection in % mode', async (connection, mode) => {
      const client = await getAuth0Client();

      vi.mocked(client.loginWithRedirect).mockReset();

      await authenticateWithRedirect(connection, mode);

      const innerConnection = vi.mocked(client.loginWithRedirect).mock.calls[0][0]?.connection;
      const innerRedirectUri = vi.mocked(client.loginWithRedirect).mock.calls[0][0]?.redirect_uri;

      expect(innerConnection).toEqual(connection);
      expect(innerRedirectUri?.includes(mode)).toBe(true);
    });
  });

  describe('logout', () => {
    it('logs out through Auth0', async () => {
      const client = await getAuth0Client();

      await logout();

      expect(client.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('manualSignup', () => {
    it('calls the webAuth signup method using the passed data', async () => {
      const userData = {
        email: 'email',
        password: 'password',
        name: 'name',
        lastName: 'lastName',
        company: 'company',
        country: 'country',
      };

      const innerUserData = {
        connection: USERNAME_PASSWORD_CONNECTION,
        email: userData.email,
        password: userData.password,
        given_name: userData.name,
        family_name: userData.lastName,
        user_metadata: {
          company: userData.company,
          country: userData.country,
        },
      };

      await manualSignup(userData);

      expect(webAuth.signup).toHaveBeenCalledTimes(1);
      expect(vi.mocked(webAuth.signup).mock.calls[0][0]).toEqual(innerUserData);
    });
  });
});
