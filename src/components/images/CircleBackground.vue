<script setup lang="ts">
const props = withDefaults(defineProps<{
  fill?: string,
  opacity?: string,
}>(), {
  fill: '#F2F4FF',
  opacity: '1.0',
});
</script>

<template>
  <svg
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="5"
      cy="5"
      r="5"
      :fill="props.fill"
      :fill-opacity="props.opacity"
    />
  </svg>
</template>
