import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { WebhookEndpointCreationOptions } from '@/interfaces/options/webhookEndpoints';

export const useWebhookEndpointsStore = defineStore('webhookEndpoints', {
  state: () => ({
    webhookEndpoints: <Array<WebhookEndpoint>>[],
    loading: true,
  }),
  actions: {
    async loadWebhookEndpoints() {
      this.loading = true;
      this.webhookEndpoints = await api.webhookEndpoints.list();
      this.loading = false;
    },
    async createWebhookEndpoint(
      options: WebhookEndpointCreationOptions,
      mode: Mode,
    ) {
      const webhookEndpoint = await api.webhookEndpoints.create(options, mode);
      this.webhookEndpoints = [...this.webhookEndpoints, webhookEndpoint];
    },
    async updateWebhookEndpoint(
      webhookEndpoint: WebhookEndpoint,
      data: Record<string, boolean>,
    ) {
      if (!this.webhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.webhookEndpoints.indexOf(webhookEndpoint);
      const updatedWebhook = await api.webhookEndpoints.update(
        webhookEndpoint.id,
        webhookEndpoint.mode,
        data,
      );
      this.webhookEndpoints[index] = updatedWebhook;
    },
    async removeWebhookEndpoint(webhookEndpoint: WebhookEndpoint) {
      if (!this.webhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.webhookEndpoints.indexOf(webhookEndpoint);
      await api.webhookEndpoints.remove(webhookEndpoint.id, webhookEndpoint.mode);
      this.webhookEndpoints = [
        ...this.webhookEndpoints.slice(0, index),
        ...this.webhookEndpoints.slice(index + 1),
      ];
    },
    async getWebhookEndpointSecret(webhookEndpoint: WebhookEndpoint) {
      const payload = await api.webhookEndpoints.getSecret(
        webhookEndpoint.id,
        webhookEndpoint.mode,
      );
      return payload.secret;
    },
    async sendTestWebhook(webhookEndpoint: WebhookEndpoint, event: string) {
      return api.webhookEndpoints.sendTestWebhook(webhookEndpoint.id, event);
    },
  },
  getters: {
    liveWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === Mode.Live,
    ),
    testWebhookEndpoints: (state) => state.webhookEndpoints.filter(
      (webhookEndpoint) => webhookEndpoint.mode === Mode.Test,
    ),
    getById: (state) => (id: string) => state.webhookEndpoints.find(
      (webhookEndpoint) => webhookEndpoint.id === id,
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhookEndpointsStore, import.meta.hot));
}
