<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  showLabel?: boolean,
  label?: string,
  subLabel?: string,
}>(), {
  showLabel: true,
});

const subLabelFontSizeClass = computed(() => {
  if (!props.label && props.subLabel && props.showLabel) {
    return 'text-sm';
  }
  return 'text-xs';
});
</script>

<template>
  <div class="whitespace-nowrap">
    <div v-if="props.showLabel">
      <p
        v-if="props.label"
        class="font-medium text-body-color text-sm"
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
    <p v-else>
      -
    </p>
  </div>
</template>
