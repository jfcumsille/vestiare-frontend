import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { USER_SIGNED_UP, SIGN_UP_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import GenericInput from '@/components/forms/GenericInput.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(SignUpView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('SignUpView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when SignUpView is mounted', () => {
    it('tracks SignUpView page view with analytics', () => {
      const wrapper = getWrapper();
      const signUpView = wrapper.find('[data-test="sign-up-view"]');
      expect(signUpView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, SIGN_UP_VIEWED, { origin: 'dashboard' });
    });
  });

  const handleCheckbox = (wrapper: VueWrapper) => {
    const checkBox = wrapper.find('[data-test="terms-checkbox"]');
    expect(checkBox.exists()).toBe(true);
    checkBox.setValue(true);
  };

  const fillInputsForm = (wrapper: VueWrapper) => {
    const inputs = wrapper.findAllComponents(GenericInput);
    inputs.forEach((input) => {
      input.setValue('something');
    });
  };

  describe('when user signs up', () => {
    it('tracks \'User Signed Up\' with analytics', async () => {
      const wrapper = getWrapper();
      fillInputsForm(wrapper);
      handleCheckbox(wrapper);
      await wrapper.vm.$forceUpdate();

      const signUpButton = wrapper.find('[data-test="sign-up-button"]');
      expect(signUpButton.exists()).toBe(true);
      await signUpButton.trigger('click');
      await wrapper.vm.$forceUpdate();

      expectToTrackWithAnalytics(analyticsTrackMock, USER_SIGNED_UP);
    });
  });
});
