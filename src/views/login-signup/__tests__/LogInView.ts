import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { USER_LOGGED_IN, LOG_IN_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import LogInView from '@/views/login-signup/LogInView.vue';
import router from '@/router/index';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(LogInView, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        router,
      ],
    },
  });
  return wrapper;
};

describe('LogInView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when LogInView is mounted', () => {
    it('tracks LogInView page view with analytics', () => {
      const wrapper = getWrapper();
      const loginView = wrapper.find('[data-test="login-view"]');
      expect(loginView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, LOG_IN_VIEWED);
    });
  });

  describe('when user logs in', () => {
    it('tracks \'User Logged In\' with analytics', async () => {
      const wrapper = getWrapper();
      const loginButton = wrapper.find('[data-test="login-button"]');
      expect(loginButton.exists()).toBe(true);
      await loginButton.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, USER_LOGGED_IN);
    });
  });
});
