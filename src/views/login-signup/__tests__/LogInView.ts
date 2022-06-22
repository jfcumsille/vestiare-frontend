import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { LOG_IN_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import LogInView from '@/views/login-signup/LogInView.vue';
import router from '@/router/index';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

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
});
