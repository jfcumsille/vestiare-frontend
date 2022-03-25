<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  active: boolean,
  loading?: boolean,
}>(), {
  loading: false,
});

const emit = defineEmits<{(e: 'toggle'): void }>();

const onClick = () => {
  if (!props.loading) {
    emit('toggle');
  }
};

const colorClasses = computed(() => {
  if (props.active) {
    return 'bg-primary-main';
  }
  return 'bg-gray-200';
});
const translatedClass = computed(() => (props.active ? 'translate-x-full' : ''));
const loadingClasses = computed(() => (props.loading ? 'opacity-75 cursor-default' : ''));
</script>

<template>
  <div
    data-test="pill"
    :class="`
        flex items-center cursor-pointer w-11 h-6 m-0
        rounded-full border border-gray-200
        ease-linear duration-75 ${colorClasses}
        ${loadingClasses}
      `"
    @click="onClick"
  >
    <div
      data-test="ball"
      :class="`
        rounded-full bg-white w-5 h-5
        ease-linear duration-75 ${translatedClass}
      `"
    />
  </div>
</template>
