import i18next from 'i18next';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { links } from '@/api';

export const useLinksStore = defineStore('links', {
  state: () => ({
    language: i18next.language,
  }),
  actions: {
    async getLinks(params: Record<string, string>) {
      const userLinks = await links.getLinks(params);
      console.log(userLinks);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
