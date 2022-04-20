import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { EMAIL_SENT, RESET_PASSWORD_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, expectToTrackPageWithAnalytics, mockPageAndTrackAnalytics } from '@/services/tests';
import ResetPasswordView from '@/views/login-signup/ResetPasswordView.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(ResetPasswordView, {
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

  describe('when ResetPasswordView is mounted', () => {
    it('tracks ResetPasswordView page view with analytics', () => {
      const wrapper = getWrapper();
      const resetPasswordView = wrapper.find('[data-test="reset-password-view"]');
      expect(resetPasswordView.exists()).toBe(true);
      expectToTrackPageWithAnalytics(analyticsPageMock, RESET_PASSWORD_VIEWED);
    });
  });

  describe('when user clicks reset password', () => {
    it('tracks \'Email Sent\' with analytics', async () => {
      const wrapper = getWrapper();
      const resetPassButton = wrapper.find('[data-test="reset-pass-button"]');
      expect(resetPassButton.exists()).toBe(true);
      await resetPassButton.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, EMAIL_SENT, { type: 'reset_password' });
    });
  });

  describe('when user clicks resend reset password', () => {
    it('tracks \'Email Sent\' with analytics', async () => {
      const wrapper = getWrapper();
      // first has to press reset button to show "resend email"
      const resetPassButton = wrapper.find('[data-test="reset-pass-button"]');
      expect(resetPassButton.exists()).toBe(true);
      await resetPassButton.trigger('click');

      const resendResetPassButton = wrapper.find('[data-test="resend-reset-pass-button"]');
      expect(resendResetPassButton.exists()).toBe(true);
      await resendResetPassButton.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, EMAIL_SENT, { type: 'resend_reset_password' });
    });
  });
});
