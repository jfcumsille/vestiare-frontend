import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WEBHOOK_ENDPOINT_CREATED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import WebhookEndpointCreationModal from '@/views/webhookEndpoints/components/WebhookEndpointCreationModal.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(WebhookEndpointCreationModal, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        router,
      ],
    },
    props: {
      live: false,
    },
  });
  return wrapper;
};

describe('WebhookEndpointCreationModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when webhook is created', () => {
    it('tracks \'Webhook Endpoint Created\' with analytics', async () => {
      const wrapper = getWrapper();

      wrapper.vm.url = 'https://url.com';
      wrapper.vm.events = [
        { name: 'link.credentials_changed', checked: true },
        { name: 'payment_intent.succeeded', checked: true },
        { name: 'payment_intent.failed', checked: false },
        { name: 'account.refresh_intent.succeeded', checked: false },
        { name: 'link.refresh_intent.succeeded', checked: false },
        { name: 'account.refresh_intent.failed', checked: false },
        { name: 'payment_intent.rejected', checked: false },
        { name: 'link.refresh_intent.failed', checked: false },
        { name: 'account.refresh_intent.rejected', checked: false },
      ];
      await wrapper.vm.$forceUpdate();
      const createButton = wrapper.find('[data-test="create-webhook-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');
      const properties = { enabled_events: ['link.credentials_changed', 'payment_intent.succeeded'], origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, WEBHOOK_ENDPOINT_CREATED, properties);
    });
  });
});
