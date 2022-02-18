import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter += 1;
    },
    randomize() {
      this.counter = Math.round(100 * Math.random());
    },
    reset() {
      this.counter = 0;
    },
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
    nthCount: (state) => (n: number) => state.counter * n,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
