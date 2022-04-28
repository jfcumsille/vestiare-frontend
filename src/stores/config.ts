import { defineStore, acceptHMRUpdate } from 'pinia';
import { Mode } from '@/interfaces/utilities/enums';

export const useConfigStore = defineStore('config', {
  state: () => ({
    mode: Mode.Live,
  }),
  actions: {
    updateMode(mode: Mode) {
      this.mode = mode;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}
