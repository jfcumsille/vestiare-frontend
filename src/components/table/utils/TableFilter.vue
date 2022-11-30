<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { Mode } from '@/interfaces/utilities/enums';
import FilterIcon from '@/assets/svg/FilterIcon.vue';

const configStore = useConfigStore();

const props = defineProps<{
  label: string,
}>();

const emit = defineEmits<{(e: 'toggle'): void }>();

const toggle = () => {
  emit('toggle');
};
</script>

<template>
  <div
    class="whitespace-nowrap"
  >
    <button
      class="flex flex-row items-center justify-center rounded-lg font-medium min-w-max space-x-1"
      @click="toggle()"
    >
      <FilterIcon
        class="w-4 h-4"
        :class="configStore.mode === Mode.Live
          ? 'text-primary-border'
          : 'text-placeholder-color'"
      />
      <div>
        {{ props.label }}
      </div>
    </button>
  </div>
</template>
