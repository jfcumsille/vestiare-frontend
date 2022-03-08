import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';

export const useWebhookEndpointsStore = defineStore('webhookEndpoints', {
  state: () => ({
    webhookEndpoints: <Array<WebhookEndpoint>>[],
    loading: true,
  }),
  actions: {
    async loadWebhookEndpoints(organization: string) {
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
    async removeWebhookEndpoint(organization: string, webhookEndpoint: WebhookEndpoint) {
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
    async getWebhookEndpointSecret(organization: string, webhookEndpoint: WebhookEndpoint) {
      const payload = await api.webhookEndpoints.getSecret(
        organization,
        webhookEndpoint.id,
        webhookEndpoint.mode,
      );
      return payload.secret;
    },
  },
  getters: {
    liveWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === 'live',
    ),
    testWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === 'test',
    ),
    getById: (state) => (id: string) => state.webhookEndpoints.find(
      (webhookEndpoint) => webhookEndpoint.id === id,
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhookEndpointsStore, import.meta.hot));
}
