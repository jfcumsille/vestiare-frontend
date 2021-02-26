<template>
  <div v-show="lastPage > 1" class="flex flex-row">
    <button
      v-on:click="paginate({ page: 1, mode })"
      class="px-2 py-1 my-0.25 mr-0.25 text-sm font-medium bg-white border border-gray-300
             hover:bg-gray-700 focus:outline-none hover:text-white"
    >
      {{ 'Primera' }}
    </button>
    <button
      v-on:click="paginate( {page: Math.max(1, currentPage - 1), mode })"
      class="px-2 py-1 m-0.25 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-700
             focus:outline-none hover:text-white"
    >
      {{ 'Anterior' }}
    </button>
    <div
      v-for="page in getNumbers(
        Math.max(1, currentPage - pagesSpread),
        Math.min(currentPage + pagesSpread, lastPage) + 1,
      )"
      :key="page"
      v-bind:index="page"
    >
      <button
        v-show="page === currentPage"
        class="px-2 py-1 m-0.25 text-sm font-medium bg-gray-700 border border-gray-300 text-white"
      >
        {{ page }}
      </button>
      <button
        v-on:click="paginate({ page, mode })"
        v-show="page !== currentPage"
        class="px-2 py-1 m-0.25 text-sm font-medium bg-white border border-gray-300
               focus:outline-none hover:bg-gray-700 hover:text-white"
      >
        {{ page }}
      </button>
    </div>
    <button
      v-on:click="paginate({ page: Math.min(lastPage, currentPage + 1), mode })"
      class="px-2 py-1 m-0.25 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-700
             focus:outline-none hover:text-white"
    >
      {{ 'Siguiente' }}
    </button>
    <button
      v-on:click="paginate({ page: lastPage, mode})"
      class="px-2 py-1 my-0.25 ml-0.25 text-sm font-medium bg-white border border-gray-300
             hover:bg-gray-700 focus:outline-none hover:text-white"
    >
      {{ 'Última' }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  data() {
    return {
      pagesSpread: 3,
    };
  },

  computed: {
    ...mapState({
      mode: (state) => state.links.mode,
    }),
  },

  methods: {
    getNumbers(start, stop) {
      return new Array(stop - start).fill(start).map((n, i) => n + i);
    },
  },

  props: {
    currentPage: Number,
    lastPage: Number,
    paginate: Function,
  },
};
</script>
