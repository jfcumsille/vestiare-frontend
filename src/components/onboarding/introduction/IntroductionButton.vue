<template>
  <div class="text-center border-tint-yelllow appearance-none border rounded w-full py-2
        px-3 text-gray-700 mt-1 leading-tight focus:outline-none hover:bg-tint-yellow
        cursor-pointer"
        v-bind:class="{ 'bg-tint-yellow': isActive }">
      <slot />
    </diV>
</template>

<script>
export default {
  props: {
    name: String,
    isActive: Boolean,
  },
};
</script>
