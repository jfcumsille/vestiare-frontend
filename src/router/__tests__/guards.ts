import {
  beforeAll, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/user';
import { loadUser } from '@/router/guards';
import { mockCrypto } from '@/utils/tests/crypto';

const testingPinia = createTestingPinia({ createSpy: vi.fn, fakeApp: true });

describe('router guards', () => {
  beforeAll(() => {
    setActivePinia(testingPinia);
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  describe('loadUser', () => {
    it('loads the user when the token gets retrieved correctly', async () => {
      vi.mock('@auth0/auth0-spa-js', () => {
        const clientMock = vi.fn(() => ({
          getTokenSilently: vi.fn(async () => 'this is a token'),
        }));

        return {
          default: clientMock,
          Auth0Client: clientMock,
        };
      });

      const userStore = useUserStore();

      // @ts-expect-error: Only the `path` parameter is used in the function
      await loadUser({ path: '/this/path/is/not/relevant' });

      expect(userStore.loadUser).toHaveBeenCalledTimes(1);

      vi.unmock('@auth0/auth0-spa-js');
    });
  });
});
