<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  subLabel?: string,
}>();

const subLabelFontSizeClass = computed(() => {
  if (!props.label && props.subLabel) {
    return 'text-base';
  }
  return 'text-xs';
});
</script>

<template>
  <div class="flex flex-col justify-center items-start whitespace-nowrap space-y-1">
    <p
      v-if="props.label"
      class="font-medium text-body-color text-base"
    >
      {{ props.label }}
    </p>
    <p
      v-if="props.subLabel"
      :class="`font-normal text-secondary-color ${subLabelFontSizeClass}`"
    >
      {{ subLabel }}
    </p>
  </div>
</template>
