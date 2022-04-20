import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { USER_SIGNED_UP, EMAIL_SENT, SIGN_UP_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, expectToTrackPageWithAnalytics, mockPageAndTrackAnalytics } from '@/services/tests';
import SignUpView from '@/views/login-signup/SignUpView.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(SignUpView, {
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

describe('SignUpView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when SignUpView is mounted', () => {
    it('tracks SignUpView page view with analytics', () => {
      const wrapper = getWrapper();
      const signUpView = wrapper.find('[data-test="sign-up-view"]');
      expect(signUpView.exists()).toBe(true);
      expectToTrackPageWithAnalytics(analyticsPageMock, SIGN_UP_VIEWED);
    });
  });

  describe('when user signs up', () => {
    it('tracks \'User Signed Up\' with analytics', async () => {
      const wrapper = getWrapper();

      // enable the sign up button by adding values to inputs
      wrapper.vm.email = 'xxx';
      wrapper.vm.password = 'xxx';
      wrapper.vm.name = 'xxx';
      wrapper.vm.lastName = 'xxx';
      wrapper.vm.isChecked = true;
      await wrapper.vm.$forceUpdate();

      const signUpButton = wrapper.find('[data-test="sign-up-button"]');
      expect(signUpButton.exists()).toBe(true);
      await signUpButton.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, USER_SIGNED_UP);
    });
  });

  describe('when user clicks resend verification email', async () => {
    it('tracks \'Email Sent\' with analytics', async () => {
      const wrapper = getWrapper();

      // enable the sign up button by adding values to inputs
      wrapper.vm.email = 'xxx';
      wrapper.vm.password = 'xxx';
      wrapper.vm.name = 'xxx';
      wrapper.vm.lastName = 'xxx';
      wrapper.vm.isChecked = true;
      await wrapper.vm.$forceUpdate();

      const signUpButton = wrapper.find('[data-test="sign-up-button"]');
      expect(signUpButton.exists()).toBe(true);
      await signUpButton.trigger('click');

      const resendVerifyButton = wrapper.find('[data-test="resend-verify-email-button"]');
      expect(resendVerifyButton.exists()).toBe(true);
      await resendVerifyButton.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, EMAIL_SENT, { type: 'resend_verification_email' });
    });
  });
});
