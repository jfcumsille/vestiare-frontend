import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { PaymentIntentFilter } from '@/interfaces/utilities/table';
import { DEFAULT_PAGE_SIZE } from '@/constants/table';
import { Json } from '@/interfaces/utilities/json';
import { useConfigStore } from './config';

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    paymentIntents: <Array<PaymentIntent>>[],
    remainingPaymentIntents: -1,
    total: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    backendPage: 1,
    loading: true,
    allFilters: <PaymentIntentFilter>{},
    openedStatus: false,
  }),
  actions: {
    async loadPaymentIntents() {
      this.loading = true;
      const configStore = useConfigStore();
      const mode = configStore.mode;
      const page = this.backendPage;
      const perPage = 100;

      const result = await api.payments.list({
        ...this.allFilters as Json, mode, page, perPage,
      });
      this.paymentIntents = [...this.paymentIntents, ...result.paymentIntents];
      this.total = result.total;
      this.loading = false;
    },
    removePaymentIntents() {
      this.paymentIntents = [];
      this.remainingPaymentIntents = -1;
      this.total = 0;
      this.currentPage = 1;
      this.backendPage = 1;
    },
    async reloadPaymentIntents() {
      this.loading = true;
      this.removePaymentIntents();
      await this.loadPaymentIntents();
    },
    async updateFilters(filters: PaymentIntentFilter) {
      this.allFilters = filters;
      await this.reloadPaymentIntents();
    },
    updateRemainingPaymentIntents() {
      const resultsSeen = this.paymentIntents.length < this.total
        ? this.currentPage * this.pageSize : this.paymentIntents.length;
      this.remainingPaymentIntents = this.paymentIntents.length - resultsSeen;
      this.loadMorePaymentIntentsIfNecessary();
    },
    changeCurrentPageBy(value: number) {
      this.currentPage += value;
      this.updateRemainingPaymentIntents();
    },
    updatePageSize(value: number) {
      this.pageSize = value;
      this.currentPage = 1;
      this.updateRemainingPaymentIntents();
    },
    loadMorePaymentIntentsIfNecessary() {
      if (this.remainingPaymentIntents < this.pageSize && this.paymentIntents.length < this.total) {
        this.backendPage += 1;
        this.loadPaymentIntents();
      }
    },
  },
  getters: {
    paginatedPaymentIntents: (state) => {
      const start = ((state.currentPage - 1) * state.pageSize);
      const end = state.currentPage * state.pageSize;
      return state.paymentIntents.slice(start, end);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentsStore, import.meta.hot));
}