import { defineStore, acceptHMRUpdate } from 'pinia';
import { links } from '@/api';
import { Link } from '@/api/interfaces/links';

export const useLinksStore = defineStore('links', {
  state: () => ({
    links: <Array<Link>>[],
    loading: false,
  }),
  actions: {
    async getLinks(organization: string, params: Record<string, string> = {}) {
      this.loading = true;
      const userLinks = await links.getLinks(organization, params);
      this.links = userLinks;
      this.loading = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
