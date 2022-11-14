<script setup lang="ts">
import { computed } from 'vue';
import { BadgeStatus } from '@/interfaces/utilities/enums';

const props = defineProps<{
  text: string
  status: BadgeStatus
}>();

const colorClasses = computed(() => {
  if (props.status === BadgeStatus.Danger) {
    return 'bg-danger-surface text-danger-main';
  }
  if (props.status === BadgeStatus.Success) {
    return 'bg-success-surface text-success-main';
  }
  if (props.status === BadgeStatus.Warning) {
    return 'bg-warning-surface text-warning-main';
  }
  return '';
});
</script>

<template>
  <span
    :class="
      `select-none text-sm font-medium mr-2 px-2.5 py-0.5
      rounded-full whitespace-nowrap ${colorClasses}`
    "
  >
    {{ props.text }}
  </span>
</template>
