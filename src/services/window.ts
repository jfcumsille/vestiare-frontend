import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);

window.onresize = () => {
  windowWidth.value = window.innerWidth;
};

export const widthType = computed(() => {
  if (windowWidth.value < 680) return 's';
  if (windowWidth.value >= 680 && windowWidth.value < 1000) return 'md';
  if (windowWidth.value >= 1000) return 'lg';
  return null;
});

export const width = computed(() => windowWidth.value);
