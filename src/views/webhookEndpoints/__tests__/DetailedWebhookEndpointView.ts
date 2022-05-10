import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import DetailedWebhookEndpointsView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(DetailedWebhookEndpointsView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('DetailedWebhookEndpointsView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock);
  });

  describe('when DetailedWebhookEndpointsView is mounted', () => {
    it('tracks DetailedWebhookEndpointsView page view with analytics', () => {
      const wrapper = getWrapper();
      const detailedWebhookEndpointsView = wrapper.find('[data-test="detailed-webhook-endpoints-view"]');
      expect(detailedWebhookEndpointsView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, WEBHOOK_ENDPOINTS_VIEWED, { type: 'detail' });
    });
  });
});
