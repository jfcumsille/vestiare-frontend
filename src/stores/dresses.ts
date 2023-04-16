import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Dress } from '@/interfaces/entities/dresses';
import { DressFilter } from '@/interfaces/utilities/table';
import { DressFilterType } from '@/interfaces/utilities/enums';
import { hasFilters } from '@/utils/table';
import { Json } from '@/interfaces/utilities/json';
import { DEFAULT_PAGE_SIZE } from '@/constants/table';

export const useDressesStore = defineStore('dresses', {
  state: () => ({
    dresses: <Array<Dress>>[],
    remainingDresses: -1,
    total: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    backendPage: 1,
    loading: true,
    allFilters: <DressFilter>{},
    filtersShown: new Set<DressFilterType>(),
    filtersOpened: new Set<DressFilterType>(),
  }),
  actions: {
    async loadDresses() {
      this.loading = true;
      const page = this.backendPage;
      const perPage = 100;

      const result = await api.dresses.list({
        ...this.allFilters as Json, page, perPage,
      });
      this.dresses = [...this.dresses, ...result.dresses];
      this.total = result.total;
      this.loading = false;
    },
    async updateDress(dress: Dress, data: Json) {
      if (!this.dresses.includes(dress)) {
        throw new Error('Invalid dress');
      }
      const index = this.dresses.indexOf(dress);
      const updatedDress = await api.dresses.update(dress.id, data);
      this.dresses[index] = updatedDress;
    },
    async removeLink(dress: Dress) {
      if (!this.dresses.includes(dress)) {
        throw new Error('Invalid dress');
      }
      const index = this.dresses.indexOf(dress);
      await api.links.remove(dress.id);
      this.dresses.splice(index, 1);
      this.total -= 1;
      this.updateRemainingDresses();
    },
    removeDresses() {
      this.dresses = [];
      this.remainingDresses = -1;
      this.total = 0;
      this.currentPage = 1;
      this.backendPage = 1;
    },
    async reloadDresses() {
      this.loading = true;
      this.removeDresses();
      await this.loadDresses();
    },
    async updateFilters(filters: DressFilter) {
      this.allFilters = filters;
      await this.reloadDresses();
    },
    updateRemainingDresses() {
      const resultsSeen = this.dresses.length < this.total
        ? this.currentPage * this.pageSize : this.dresses.length;
      this.remainingDresses = this.dresses.length - resultsSeen;
      this.loadMoreDressesIfNecessary();
    },
    changeCurrentPageBy(value: number) {
      this.currentPage += value;
      this.updateRemainingDresses();
    },
    updatePageSize(value: number) {
      this.pageSize = value;
      this.currentPage = 1;
      this.updateRemainingDresses();
    },
    loadMoreDressesIfNecessary() {
      if (this.remainingDresses < this.pageSize && this.dresses.length < this.total) {
        this.backendPage += 1;
        this.loadDresses();
      }
    },
  },
  getters: {
    paginatedDresses: (state) => {
      const start = ((state.currentPage - 1) * state.pageSize);
      const end = state.currentPage * state.pageSize;
      return state.dresses.slice(start, end);
    },
    hasAppliedFilters: (state) => (
      hasFilters(state.allFilters as Record<string, Array<string>>)
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDressesStore, import.meta.hot));
}
