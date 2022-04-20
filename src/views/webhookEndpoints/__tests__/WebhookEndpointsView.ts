import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import {
  MODAL_VIEWED,
  MODAL_CLOSED,
  WEBHOOK_ENDPOINTS_VIEWED,
} from '@/constants/analyticsEvents';
import { expectToTrackPageWithAnalytics, expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/services/tests';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import WebhookEndpointCreationModal from '@/views/webhookEndpoints/components/WebhookEndpointCreationModal.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(WebhookEndpointsView, {
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

describe('WebhookEndpointsView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when WebhookEndpointsView is mounted', () => {
    it('tracks WebhookEndpointsView page view with analytics', () => {
      const wrapper = getWrapper();
      const webhookEndpointsView = wrapper.find('[data-test="webhook-endpoints-view"]');
      expect(webhookEndpointsView.exists()).toBe(true);
      expectToTrackPageWithAnalytics(analyticsPageMock, WEBHOOK_ENDPOINTS_VIEWED, { type: 'main' });
    });
  });

  describe('when create webhook modal is opened', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const createButton = wrapper.find('[data-test="webhook-create-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');
      const properties = { action: 'create', location: 'webhook_endpoints' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_VIEWED, properties);
    });
  });

  describe('when create webhook modal is closed', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const createButton = wrapper.find('[data-test="webhook-create-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');

      const createModal = wrapper.findComponent(WebhookEndpointCreationModal);
      expect(createModal.exists()).toBe(true);
      createModal.vm.$emit('close');

      const properties = { action: 'create', location: 'webhook_endpoints' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_CLOSED, properties);
    });
  });
});
