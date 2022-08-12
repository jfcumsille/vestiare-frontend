import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { useRoute } from 'vue-router';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { LOG_IN_VIEWED } from '@/constants/analyticsEvents';
import { Json } from '@/interfaces/utilities/json';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import LogInView from '@/views/login-signup/LogInView.vue';
import router from '@/router/index';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

interface MockedUseRoute {
  mockReturnValue: (value: Json) => void;
}

const getWrapper = () => {
  const wrapper = mount(LogInView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('LogInView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when LogInView is mounted', () => {
    it('tracks LogInView page view with analytics', () => {
      const wrapper = getWrapper();
      const loginView = wrapper.find('[data-test="login-view"]');
      expect(loginView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, LOG_IN_VIEWED, { origin: 'dashboard' });
    });
  });
  describe('verify your account error', async () => {
    beforeEach(() => {
      vi.mock('vue-router', () => ({
        useRoute: vi.fn().mockReturnValue({ query: {} }),
        createWebHistory: vi.fn(),
        createRouter: vi.fn().mockReturnValue({
          push: vi.fn(), beforeEach: vi.fn(), afterEach: vi.fn(), install: vi.fn(),
        }),
      }));
    });
    it('doesn\'t show verify your account error message', () => {
      const wrapper = getWrapper();
      const verifyYourEmailWarning = wrapper.find('[data-test="verify-email-warning"]');
      expect(verifyYourEmailWarning.exists()).toBe(false);
    });
    describe('when verify your account error is in query params', () => {
      it('shows verify your account error message', async () => {
        (useRoute as unknown as MockedUseRoute).mockReturnValue({ query: { error_description: 'Please verify your email before logging in' } });
        const wrapper = getWrapper();
        const verifyYourEmailWarning = wrapper.find('[data-test="verify-email-warning"]');
        expect(verifyYourEmailWarning.exists()).toBe(true);
      });
    });
  });
});
