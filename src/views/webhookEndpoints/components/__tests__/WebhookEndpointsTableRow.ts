import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { WEBHOOK_ENDPOINT_DELETED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import WebhookEndpointsTableRow from '@/views/webhookEndpoints/components/WebhookEndpointsTableRow.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const webhookEndpoint: WebhookEndpoint = {
    id: 'id',
    name: 'name',
    enabledEvents: ['link.refresh_intent.succeeded', 'link.refresh_intent.failed'],
    mode: Mode.Test,
    secret: 'secret',
    status: 'status',
    url: 'https://url.com',
    name: 'name',
  };
  const wrapper = mount(WebhookEndpointsTableRow, {
    global: {
      plugins: [testingPinia, router],
    },
    props: {
      webhookEndpoint,
    },
  });
  return wrapper;
};

describe('WebhookEndpointsTableRow', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
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
