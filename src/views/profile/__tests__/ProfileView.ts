import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { PROFILE_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import ProfileView from '@/views/profile/ProfileView.vue';
import router from '@/router/index';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(ProfileView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('ProfileView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when ProfileView is mounted', () => {
    it('tracks ProfileView page view with analytics', () => {
      const wrapper = getWrapper();
      const profileView = wrapper.find('[data-test="profile-view"]');
      expect(profileView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, PROFILE_VIEWED, { origin: 'dashboard' });
    });
  });
});
