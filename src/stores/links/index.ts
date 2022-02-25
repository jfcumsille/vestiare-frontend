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
      const userLinks = await links.get(organization, params);
      this.links = userLinks;
      this.loading = false;
    },
    async removeLink(organization: string, link: Link) {
      if (!this.links.includes(link)) {
        throw new Error('Invalid link');
      }
      const index = this.links.indexOf(link);
      await links.remove(organization, link.id);
      this.links = [
        ...this.links.slice(0, index),
        ...this.links.slice(index + 1),
      ];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
