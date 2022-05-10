import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WEBHOOK_ENDPOINT_CREATED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import WebhookEndpointCreationModal from '@/views/webhookEndpoints/components/WebhookEndpointCreationModal.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(WebhookEndpointCreationModal, {
    global: {
      plugins: [testingPinia, router],
    },
    props: {
      live: false,
    },
  });
  return wrapper;
};

describe('WebhookEndpointCreationModal', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when webhook is created', () => {
    it('tracks \'Webhook Endpoint Created\' with analytics', async () => {
      const wrapper = getWrapper();

      wrapper.vm.url = 'https://url.com';
      wrapper.vm.name = 'name';
      wrapper.vm.description = 'description';
      wrapper.vm.events = [
        { eventName: 'link.credentials_changed', checked: true },
        { eventName: 'payment_intent.succeeded', checked: true },
        { eventName: 'payment_intent.failed', checked: false },
        { eventName: 'account.refresh_intent.succeeded', checked: false },
        { eventName: 'link.refresh_intent.succeeded', checked: false },
        { eventName: 'account.refresh_intent.failed', checked: false },
        { eventName: 'payment_intent.rejected', checked: false },
        { eventName: 'link.refresh_intent.failed', checked: false },
        { eventName: 'account.refresh_intent.rejected', checked: false },
      ];
      await wrapper.vm.$forceUpdate();
      const createButton = wrapper.find('[data-test="create-webhook-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');
      await wrapper.vm.$forceUpdate();
      const properties = { enabled_events: ['link.credentials_changed', 'payment_intent.succeeded'], origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, WEBHOOK_ENDPOINT_CREATED, properties);
    });
  });
});
