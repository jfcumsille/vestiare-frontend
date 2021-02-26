<template>
  <div class="flex w-48 rounded-md border border-gray-300 px-4 py-2
           bg-white text-base font-medium text-gray-900">
    <input v-model="text"
           v-on:keyup.enter="handleClick"
           class="w-full focus:outline-none"
           type="text"
           placeholder="Buscar RUT"
           name="rut"
           v-rut:live>
    <button @click="handleClick"
      class="bg-white w-auto flex justify-end items-center text-gray-800
        px-2 hover:text-gray-600 focus:outline-none">
      <font-awesome-icon icon="search" class="h-4 mr-2"/>
    </button>
  </div>
</template>

<script>

export default {

  data() {
    return {
      text: '',
    };
  },

  methods: {
    handleClick() {
      this.onClick(this.text.replace(/[.-]/g, ''), this.filterKey);
    },
  },

  props: {
    onClick: Function,
    filterKey: String,
  },
};
</script>
