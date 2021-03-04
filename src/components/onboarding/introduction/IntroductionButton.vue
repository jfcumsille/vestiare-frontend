<template>
  <div class="text-center border-tint-yelllow appearance-none border
        rounded w-full py-2
        px-2 mt-1 leading-tight focus:outline-none
        hover:bg-sub hover:text-white
        cursor-pointer text-sm"
        v-bind:class="{ 'bg-main': isActive, 'text-white': isActive, 'text-gray-800': !isActive }">
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
