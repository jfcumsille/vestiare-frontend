import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { APIKey } from '@/interfaces/entities/apiKeys';

export const useAPIKeysStore = defineStore('apiKeys', {
  state: () => ({
    apiKeys: <Array<APIKey>>[],
    loading: false,
  }),
  actions: {
    async getAPIKeys(organization: string, params: Record<string, string> = {}) {
      this.loading = true;
      this.apiKeys = await api.apiKeys.list(organization, params);
      this.loading = false;
    },
  },
  getters: {
    searchKey: (state) => (isPublic: boolean, mode: 'live' | 'test') => state.apiKeys.filter(
      (key) => key.isPublic === isPublic && key.mode === mode,
    )[0],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAPIKeysStore, import.meta.hot));
}
