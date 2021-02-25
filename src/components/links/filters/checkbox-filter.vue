<template>
  <div>
    <label v-for='module in modules' v-bind:key='module.id'
        class="mx-3 flex justify-start items-center">
      <div class="bg-white border-2 border-gray-400 rounded w-5 h-5 flex flex-shrink-0
          justify-center items-center mr-2">
      <input type="checkbox" class="px-2 py-2 bg-white opacity-0 absolute focus:outline-none"
        v-model="module.checked" v-bind:id="module.id" @change="handleChange">
      <svg class="fill-current hidden w-3 h-3 text-fintoc-green pointer-events-none"
          viewBox="0 0 20 20">
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
      </svg>
      </div>
      <div class="text-base font-medium text-gray-900">{{module.name}}</div>
      </label>
  </div>
</template>

<script>

export default {
  data() {
    return {
      modules: [
        { id: 'valid', name: 'Válida', checked: true },
        { id: 'invalid', name: 'Inválida', checked: true },
      ],
    };
  },

  methods: {
    getFilterValue() {
      if (this.modules[0].checked && this.modules[1].checked) {
        return 'all';
      }
      if (this.modules[0].checked) {
        return 'false';
      }
      if (this.modules[1].checked) {
        return 'true';
      }
      return 'none';
    },

    handleChange() {
      const value = this.getFilterValue();
      this.onClick(value, this.filterKey);
    },
  },

  props: {
    onClick: Function,
    filterKey: String,
  },
};
</script>

<style>
  input:checked + svg {
    display: block;
  }
</style>
