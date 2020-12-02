<template>
  <div class="text-center border-tint-yelllow appearance-none border
        rounded w-full py-2
        px-2 text-gray-800 mt-1 leading-tight focus:outline-none hover:border-fintoc-cyan
        hover:bg-fintoc-cyan hover:bg-opacity-25
        cursor-pointer text-sm"
        v-bind:class="{ 'bg-fintoc-cyan': isActive, 'bg-opacity-25': isActive,
        'border-fintoc-cyan': isActive }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    isActive: Boolean,
  },
};
</script>
