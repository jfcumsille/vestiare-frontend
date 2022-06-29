<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  subLabel?: string,
}>();

const subLabelFontSizeClass = computed(() => {
  if (!props.label && props.subLabel) {
    return 'text-sm';
  }
  return 'text-xs';
});
</script>

<template>
  <div class="whitespace-nowrap disabled:text-disabled-color">
    <p
      v-if="props.label"
      class="font-medium text-body-color text-sm text-ellipsis overflow-hidden"
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
