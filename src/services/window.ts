import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

export const widthType = computed(() => {
  if (width.value < 680) {
    return 's';
  }
  if (width.value < 1000) {
    return 'md';
  }
  return 'lg';
});

export const openLink = (link: string) => {
  window.open(link);
};
