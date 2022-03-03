import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { WebhookEndpoint } from '@/api/interfaces/webhookEndpoints';

export const useWebhookEndpointsStore = defineStore('webhookEndpoints', {
  state: () => ({
    webhookEndpoints: <Array<WebhookEndpoint>>[],
    loading: true,
  }),
  actions: {
    async getWebhookEndpoints(organization: string) {
      this.loading = true;
      this.webhookEndpoints = await api.webhookEndpoints.list(organization);
      this.loading = false;
    },
    async updateWebhook(
      organization: string,
      webhookEndpoint: WebhookEndpoint,
      data: Record<string, boolean>,
    ) {
      if (!this.webhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.webhookEndpoints.indexOf(webhookEndpoint);
      const updatedWebhook = await api.webhookEndpoints.update(
        organization,
        webhookEndpoint.id,
        webhookEndpoint.mode,
        data,
      );
      this.webhookEndpoints[index] = updatedWebhook;
    },

    async removeWebhook(organization: string, webhookEndpoint: WebhookEndpoint) {
      if (!this.webhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.webhookEndpoints.indexOf(webhookEndpoint);
      await api.webhookEndpoints.remove(organization, webhookEndpoint.id, webhookEndpoint.mode);
      this.webhookEndpoints = [
        ...this.webhookEndpoints.slice(0, index),
        ...this.webhookEndpoints.slice(index + 1),
      ];
    },
  },
  getters: {
    liveWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === 'live',
    ),
    testWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === 'test',
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhookEndpointsStore, import.meta.hot));
}
