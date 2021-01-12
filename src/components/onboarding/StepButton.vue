<template>
  <div
    class="shadow-outline-lg rounded text-white
          text-md text-center py-2 px-6 mt-8  ring-0 focus:ring-0"
    v-bind:class="{
        'bg-gray-400': loading, 'bg-secondary-blue': !loading,
        'cursor-default': loading, 'cursor-pointer': !loading,
        'hover:bg-secondary-lighterBlue': !loading,
    }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
