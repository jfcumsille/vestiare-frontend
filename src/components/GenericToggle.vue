<script setup lang="ts">
import { computed } from 'vue';

const $props = defineProps<{
  active: boolean,
  loading?: boolean,
}>();

const loading = computed(() => ($props.loading === undefined ? false : $props.loading));

const $emit = defineEmits<{(e: 'toggle'): void }>();

const onClick = () => {
  if (!loading.value) {
    $emit('toggle');
  }
};

const colorClasses = computed(() => {
  if ($props.active) {
    return 'bg-blue-500';
  }
  return 'bg-gray-200';
});
const translatedClass = computed(() => ($props.active ? 'translate-x-full' : ''));
const loadingClasses = computed(() => (loading.value ? 'opacity-75 cursor-default' : ''));
</script>

<template>
  <div
    :class="`
        flex items-center cursor-pointer w-11 h-6 m-0
        rounded-full border border-gray-200
        ease-linear duration-75 ${colorClasses}
        ${loadingClasses}
      `"
    @click="onClick"
  >
    <div
      :class="`
        rounded-full bg-white w-5 h-5
        ease-linear duration-75 ${translatedClass}
      `"
    />
  </div>
</template>
