<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string
  color: 'red' | 'green' | 'yellow'
}>();

const colorClasses = computed(() => {
  if (props.color === 'red') {
    return 'bg-danger-surface text-danger-main';
  }
  if (props.color === 'green') {
    return 'bg-success-surface text-success-main';
  }
  if (props.color === 'yellow') {
    return 'bg-yellow-100 text-yellow-800';
  }
  return '';
});
</script>

<template>
  <span :class="`select-none text-sm font-semibold mr-2 px-2.5 py-0.5 rounded ${colorClasses}`">
    {{ props.text }}
  </span>
</template>
