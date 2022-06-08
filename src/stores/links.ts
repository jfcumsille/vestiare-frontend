import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Link } from '@/interfaces/entities/links';
import { Json } from '@/interfaces/utilities/json';
import { useConfigStore } from './config';

export const useLinksStore = defineStore('links', {
  state: () => ({
    links: <Array<Link>>[],
    remainingLinks: -1,
    total: 0,
    pageSize: 30,
    currentPage: 1,
    backendPage: 1,
    loading: true,
  }),
  actions: {
    async loadLinks(params: Json = {}) {
      this.loading = true;
      const configStore = useConfigStore();
      const mode = configStore.mode;
      const page = this.backendPage;
      const perPage = 100;

      const result = await api.links.list({
        ...params, page, mode, perPage,
      });
      if (result !== undefined) {
        this.links = [...this.links, ...result.links];
        this.total = result.total;
      }
      this.loading = false;
    },
    async updateLink(link: Link, data: Json) {
      if (!this.links.includes(link)) {
        throw new Error('Invalid link');
      }
      const index = this.links.indexOf(link);
      const updatedLink = await api.links.update(link.id, data);
      this.links[index] = updatedLink;
    },
    async removeLink(link: Link) {
      if (!this.links.includes(link)) {
        throw new Error('Invalid link');
      }
      const index = this.links.indexOf(link);
      await api.links.remove(link.id);
      this.links = [
        ...this.links.slice(0, index),
        ...this.links.slice(index + 1),
      ];
    },
    removeLinks() {
      this.links = [];
      this.remainingLinks = -1;
      this.total = 0;
      this.currentPage = 1;
      this.backendPage = 1;
    },
    updateRemainingLinks() {
      let resultsSeen = 0;
      if (this.links.length < this.total) {
        resultsSeen = this.currentPage * this.pageSize;
      } else {
        const last = this.links[this.links.length - 1];
        resultsSeen = this.links.indexOf(last) + 1;
      }
      this.remainingLinks = this.links.length - resultsSeen;
      this.loadMoreLinksIfNecessary();
    },
    updateBackendPage() {
      this.backendPage += 1;
    },
    updateCurrentPage(value: number) {
      this.currentPage += value;
      this.updateRemainingLinks();
    },
    updatePageSize(value: number) {
      this.pageSize = value;
      this.currentPage = 1;
      this.updateRemainingLinks();
    },
    loadMoreLinksIfNecessary() {
      if (this.remainingLinks < this.pageSize && this.links.length < this.total) {
        this.updateBackendPage();
        this.loadLinks();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
