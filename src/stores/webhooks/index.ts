import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Webhook } from '@/api/interfaces/webhooks';

export const useWebhooksStore = defineStore('webhooks', {
  state: () => ({
    liveWebhookEndpoints: [] as Webhook[],
    testWebhookEndpoints: [] as Webhook[],
    loading: true,
  }),
  actions: {
    async get(organization: string, mode: string) {
      this.loading = true;
      const webhooksList = await api.webhooks.list(organization, mode);
      const key = mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      this[key] = webhooksList;
      this.loading = false;
    },
    async updateWebhook(
      organization: string,
      webhookEndpoint: Webhook,
      data: Record<string, boolean>,
    ) {
      const key = webhookEndpoint.mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      if (!this[key].includes(webhookEndpoint)) {
        throw new Error('Invalid Webhook Endpoint');
      }
      const index = this[key].indexOf(webhookEndpoint);
      const updatedWebhook = await api.webhooks.update(
        organization,
        webhookEndpoint.id,
        webhookEndpoint.mode,
        data,
      );
      this[key][index] = updatedWebhook;
    },

    async removeWebhook(organization: string, webhookEndpoint: Webhook) {
      const key = webhookEndpoint.mode === 'test' ? 'testWebhookEndpoints' : 'liveWebhookEndpoints';
      if (!this[key].includes(webhookEndpoint)) {
        throw new Error('Invalid Webhook Endpoint');
      }
      const index = this[key].indexOf(webhookEndpoint);
      await api.webhooks.remove(organization, webhookEndpoint.id, webhookEndpoint.mode);
      this[key] = [
        ...this[key].slice(0, index),
        ...this[key].slice(index + 1),
      ];
    },

  },
  getters: {
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhooksStore, import.meta.hot));
}
