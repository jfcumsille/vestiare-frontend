import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { WebhookEndpointCreationOptions } from '@/interfaces/options/webhookEndpoints';
import { useConfigStore } from './config';

export const useWebhookEndpointsStore = defineStore('webhookEndpoints', {
  state: () => ({
    allWebhookEndpoints: <Array<WebhookEndpoint>>[],
    loading: true,
  }),
  actions: {
    async loadWebhookEndpoints() {
      this.loading = true;
      this.allWebhookEndpoints = await api.webhookEndpoints.list();
      this.loading = false;
    },
    async createWebhookEndpoint(
      options: WebhookEndpointCreationOptions,
    ) {
      const configStore = useConfigStore();
      const mode = configStore.mode;
      const webhookEndpoint = await api.webhookEndpoints.create(options, mode);
      this.allWebhookEndpoints = [...this.allWebhookEndpoints, webhookEndpoint];
    },
    async updateWebhookEndpoint(
      webhookEndpoint: WebhookEndpoint,
      data: Record<string, boolean>,
    ) {
      if (!this.allWebhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.allWebhookEndpoints.indexOf(webhookEndpoint);
      const updatedWebhook = await api.webhookEndpoints.update(
        webhookEndpoint.id,
        webhookEndpoint.mode,
        data,
      );
      this.allWebhookEndpoints[index] = updatedWebhook;
    },
    async removeWebhookEndpoint(webhookEndpoint: WebhookEndpoint) {
      if (!this.allWebhookEndpoints.includes(webhookEndpoint)) {
        throw new Error('Invalid webhook endpoint');
      }
      const index = this.allWebhookEndpoints.indexOf(webhookEndpoint);
      await api.webhookEndpoints.remove(webhookEndpoint.id, webhookEndpoint.mode);
      this.allWebhookEndpoints = [
        ...this.allWebhookEndpoints.slice(0, index),
        ...this.allWebhookEndpoints.slice(index + 1),
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
    webhookEndpoints: (state) => {
      const configStore = useConfigStore();
      const mode = configStore.mode;
      return state.allWebhookEndpoints.filter(
        (webhookEndpoint) => webhookEndpoint.mode === mode,
      );
    },
    getById: (state) => (id: string) => state.allWebhookEndpoints.find(
      (webhookEndpoint) => webhookEndpoint.id === id,
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebhookEndpointsStore, import.meta.hot));
}
