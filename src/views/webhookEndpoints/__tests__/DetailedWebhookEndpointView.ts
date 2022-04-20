import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackPageWithAnalytics, mockPageAndTrackAnalytics } from '@/services/tests';
import DetailedWebhookEndpointsView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

const analyticsPageMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(DetailedWebhookEndpointsView, {
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

describe('DetailedWebhookEndpointsView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock);
  });

  describe('when DetailedWebhookEndpointsView is mounted', () => {
    it('tracks DetailedWebhookEndpointsView page view with analytics', () => {
      const wrapper = getWrapper();
      const detailedWebhookEndpointsView = wrapper.find('[data-test="detailed-webhook-endpoints-view"]');
      expect(detailedWebhookEndpointsView.exists()).toBe(true);
      expectToTrackPageWithAnalytics(analyticsPageMock, WEBHOOK_ENDPOINTS_VIEWED, { type: 'detail' });
    });
  });
});
