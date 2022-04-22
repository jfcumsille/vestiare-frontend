import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { WEBHOOK_ENDPOINT_DELETED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import WebhookEndpointsTableElement from '@/views/webhookEndpoints/components/WebhookEndpointsTableElement.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const webhookEndpoint1: WebhookEndpoint = {
    id: 'id',
    enabledEvents: ['link.refresh_intent.succeeded', 'link.refresh_intent.failed'],
    mode: Mode.Test,
    secret: 'secret',
    status: 'status',
    url: 'https://url.com',
  };
  const wrapper = mount(WebhookEndpointsTableElement, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        router,
      ],
    },
    props: {
      webhookEndpoint: webhookEndpoint1,
    },
  });
  return wrapper;
};

describe('WebhookEndpointsTableElement', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when webhook is deleted', () => {
    it('tracks \'Webhook Endpoint Deleted\' with analytics', async () => {
      const wrapper = getWrapper();
      const removeButton = wrapper.find('[data-test="remove-webhook"]');
      expect(removeButton.exists()).toBe(true);
      await removeButton.trigger('click');
      const properties = { id: 'id', origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, WEBHOOK_ENDPOINT_DELETED, properties);
    });
  });
});
