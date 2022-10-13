<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  subLabel?: string,
  subLabelHref?: string,
}>();

const subLabelFontSizeClass = computed(() => {
  if (!props.label && props.subLabel) {
    return 'text-base';
  }
  return 'text-xs';
});
</script>

<template>
  <div class="flex flex-col justify-center items-start space-y-1 text-body-color break-normal">
    <p
      v-if="props.label"
      class="font-medium text-base"
    >
      {{ props.label }}
    </p>
    <p
      v-if="props.subLabel && !props.subLabelHref"
      :class="`font-normal ${subLabelFontSizeClass}`"
    >
      {{ subLabel }}
    </p>
    <a
      v-if="props.subLabel && props.subLabelHref"
      :class="`text-primary-main font-normal ${subLabelFontSizeClass}`"
      :href="props.subLabelHref"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ subLabel }}
    </a>
  </div>
</template>
