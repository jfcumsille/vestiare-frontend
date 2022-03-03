import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { WebhookEndpoint } from '@/api/interfaces/webhookEndpoints';

export const useWebhookEndpointsStore = defineStore('webhookEndpoints', {
  state: () => ({
    liveWebhookEndpoints: [] as WebhookEndpoint[],
    testWebhookEndpoints: [] as WebhookEndpoint[],
    loading: true,
  }),
  actions: {
    async get(organization: string, mode: string) {
      this.loading = true;
      const webhookEndpointsList = await api.webhookEndpoints.list(organization, mode);
      const key = mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      this[key] = webhookEndpointsList;
      this.loading = false;
    },
    async updateWebhook(
      organization: string,
      webhookEndpoint: WebhookEndpoint,
      data: Record<string, boolean>,
    ) {
      const key = webhookEndpoint.mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      if (!this[key].includes(webhookEndpoint)) {
        throw new Error('Invalid Webhook Endpoint');
      }
      const index = this[key].indexOf(webhookEndpoint);
      const updatedWebhook = await api.webhookEndpoints.update(
        organization,
        webhookEndpoint.id,
        webhookEndpoint.mode,
        data,
      );
      this[key][index] = updatedWebhook;
    },

    async removeWebhook(organization: string, webhookEndpoint: WebhookEndpoint) {
      const key = webhookEndpoint.mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      if (!this[key].includes(webhookEndpoint)) {
        throw new Error('Invalid Webhook Endpoint');
      }
      const index = this[key].indexOf(webhookEndpoint);
      await api.webhookEndpoints.remove(organization, webhookEndpoint.id, webhookEndpoint.mode);
      this[key] = [
        ...this[key].slice(0, index),
        ...this[key].slice(index + 1),
      ];
    },

  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhookEndpointsStore, import.meta.hot));
}
