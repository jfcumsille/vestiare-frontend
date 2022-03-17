import { defineStore, acceptHMRUpdate } from 'pinia';

export const useRouterStore = defineStore('router', {
  state: () => ({
    loading: false,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot));
}
