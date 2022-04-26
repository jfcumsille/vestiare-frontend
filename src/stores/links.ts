import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Link } from '@/interfaces/entities/links';
import { Json } from '@/interfaces/utilities/json';
import { useConfigStore } from './config';

export const useLinksStore = defineStore('links', {
  state: () => ({
    allLinks: <Array<Link>>[],
    loading: true,
  }),
  actions: {
    async loadLinks(params: Json = {}) {
      this.loading = true;
      this.allLinks = [];
      let page = 1;
      let result: Array<Link> | undefined;
      while (result === undefined || result.length !== 0) {
        /* eslint-disable-next-line no-await-in-loop */
        result = await api.links.list({ ...params, page });
        this.allLinks = [...this.allLinks, ...result];
        page += 1;
      }
      this.loading = false;
    },
    async updateLink(link: Link, data: Json) {
      if (!this.allLinks.includes(link)) {
        throw new Error('Invalid link');
      }
      const index = this.allLinks.indexOf(link);
      const updatedLink = await api.links.update(link.id, data);
      this.allLinks[index] = updatedLink;
    },
    async removeLink(link: Link) {
      if (!this.allLinks.includes(link)) {
        throw new Error('Invalid link');
      }
      const index = this.allLinks.indexOf(link);
      await api.links.remove(link.id);
      this.allLinks = [
        ...this.allLinks.slice(0, index),
        ...this.allLinks.slice(index + 1),
      ];
    },
  },
  getters: {
    links: (state) => {
      const configStore = useConfigStore();
      const mode = configStore.mode;
      return state.allLinks.filter((link) => link.mode === mode);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
