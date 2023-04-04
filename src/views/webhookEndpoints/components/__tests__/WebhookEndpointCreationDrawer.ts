import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { WEBHOOK_ENDPOINT_CREATED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import WebhookEndpointCreationDrawer from '@/views/webhookEndpoints/components/WebhookEndpointCreationDrawer.vue';
import GenericDrawer from '@/components/GenericDrawer.vue';
import { WebhookEvent } from '@/interfaces/entities/webhookEndpoints';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(WebhookEndpointCreationDrawer, {
    global: {
      plugins: [testingPinia, router],
    },
    props: {
      open: true,
    },
  });
  return wrapper;
};

const expectToClearEverything = (wrapper: VueWrapper<any>) => {
  expect(wrapper.vm.url).toBe('');
  expect(wrapper.vm.webhookEndpointName).toBe('');
  expect(wrapper.vm.description).toBe('');
  wrapper.vm.events.forEach((event: WebhookEvent) => {
    expect(event.checked).toBe(false);
  });
  expect(wrapper.vm.selectedEvents).toEqual([]);
};

describe('WebhookEndpointCreationDrawer', () => {
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
      wrapper.vm.webhookEndpointName = 'name';
      wrapper.vm.description = 'description';
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
      wrapper.vm.selectedEvents = [
        { name: 'link.credentials_changed', checked: true },
        { name: 'payment_intent.succeeded', checked: true },
      ];
      await wrapper.vm.$forceUpdate();

      const genericDrawer = wrapper.findComponent(GenericDrawer);
      expect(genericDrawer.exists()).toBe(true);
      const createButton = genericDrawer.find('[data-test="drawer-done-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');
      await wrapper.vm.$forceUpdate();
      const properties = { enabled_events: ['link.credentials_changed', 'payment_intent.succeeded'], origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, WEBHOOK_ENDPOINT_CREATED, properties);
      expectToClearEverything(wrapper);
    });
  });
});
