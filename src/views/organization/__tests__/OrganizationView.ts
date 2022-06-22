import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { ORGANIZATION_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import OrganizationView from '@/views/organization/OrganizationView.vue';
import router from '@/router/index';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(OrganizationView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('OrganizationView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when OrganizationView is mounted', () => {
    it('tracks OrganizationView page view with analytics', () => {
      const wrapper = getWrapper();
      const organizationView = wrapper.find('[data-test="organization-view"]');
      expect(organizationView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, ORGANIZATION_VIEWED, { origin: 'dashboard' });
    });
  });
});
