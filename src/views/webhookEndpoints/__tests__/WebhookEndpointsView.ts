import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { MODAL_VIEWED, MODAL_CLOSED, WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import WebhookEndpointCreationModal from '@/views/webhookEndpoints/components/WebhookEndpointCreationModal.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(WebhookEndpointsView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('WebhookEndpointsView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when WebhookEndpointsView is mounted', () => {
    it('tracks WebhookEndpointsView page view with analytics', () => {
      const wrapper = getWrapper();
      const webhookEndpointsView = wrapper.find('[data-test="webhook-endpoints-view"]');
      expect(webhookEndpointsView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, WEBHOOK_ENDPOINTS_VIEWED, { type: 'main', origin: 'dashboard' });
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
