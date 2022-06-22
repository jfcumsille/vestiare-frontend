import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Link, LinkFilter } from '@/interfaces/entities/links';
import { Json } from '@/interfaces/utilities/json';
import { DEFAULT_PAGE_SIZE } from '@/constants/table';
import { useConfigStore } from './config';

export const useLinksStore = defineStore('links', {
  state: () => ({
    links: <Array<Link>>[],
    remainingLinks: -1,
    total: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    backendPage: 1,
    loading: true,
    allFilters: <LinkFilter>{},
  }),
  actions: {
    async loadLinks() {
      this.loading = true;
      const configStore = useConfigStore();
      const mode = configStore.mode;
      const page = this.backendPage;
      const perPage = 100;

      const result = await api.links.list({
        ...this.allFilters, page, mode, perPage,
      });
      this.links = [...this.links, ...result.links];
      this.total = result.total;
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
      this.links.splice(index, 1);
      this.total -= 1;
      this.updateRemainingLinks();
    },
    removeLinks() {
      this.links = [];
      this.remainingLinks = -1;
      this.total = 0;
      this.currentPage = 1;
      this.backendPage = 1;
    },
    reloadLinks() {
      this.removeLinks();
      this.loadLinks();
    },
    updateFilters(filters: LinkFilter) {
      this.allFilters = filters;
      this.reloadLinks();
    },
    updateRemainingLinks() {
      const resultsSeen = this.links.length < this.total
        ? this.currentPage * this.pageSize : this.links.length;
      this.remainingLinks = this.links.length - resultsSeen;
      this.loadMoreLinksIfNecessary();
    },
    changeCurrentPageBy(value: number) {
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
        this.backendPage += 1;
        this.loadLinks();
      }
    },
  },
  getters: {
    paginatedlinks: (state) => {
      const start = ((state.currentPage - 1) * state.pageSize);
      const end = state.currentPage * state.pageSize;
      return state.links.slice(start, end);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
