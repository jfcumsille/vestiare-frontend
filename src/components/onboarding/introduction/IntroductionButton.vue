<template>
  <div class="text-center border-tint-yelllow appearance-none border rounded w-full py-2
        px-2 text-gray-800 mt-1 leading-tight focus:outline-none hover:bg-tint-yellow
        cursor-pointer text-sm"
        v-bind:class="{ 'bg-tint-yellow': isActive }">
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
