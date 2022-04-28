import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { useConfigStore } from './config';

export const useAPIKeysStore = defineStore('apiKeys', {
  state: () => ({
    apiKeys: <Array<APIKey>>[],
    loading: true,
  }),
  actions: {
    async loadAPIKeys() {
      this.loading = true;
      this.apiKeys = await api.apiKeys.list();
      this.loading = false;
    },
    async createAPIKey() {
      this.loading = true;
      await api.apiKeys.create();
      await this.loadAPIKeys();
      this.loading = false;
    },
    async destroyAPIKey(keyId: string) {
      this.loading = true;
      await api.apiKeys.destroy(keyId);
      await this.loadAPIKeys();
      this.loading = false;
    },
  },
  getters: {
    searchKey: (state) => (isPublic: boolean) => {
      const configStore = useConfigStore();
      const mode = configStore.mode;
      return state.apiKeys.filter(
        (key) => key.isPublic === isPublic && key.mode === mode,
      )[0];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAPIKeysStore, import.meta.hot));
}
