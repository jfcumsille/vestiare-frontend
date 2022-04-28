<script setup lang="ts">
import { computed } from 'vue';
import { useConfigStore } from '@/stores/config';
import { Mode } from '@/interfaces/utilities/enums';
import GenericToggle from '@/components/GenericToggle.vue';

const configStore = useConfigStore();
const live = computed(() => configStore.mode === Mode.Live);
const toggle = () => {
  const newMode = live.value ? Mode.Test : Mode.Live;
  configStore.updateMode(newMode);
};
</script>

<template>
  <div class="flex my-auto items-center">
    <p
      class="pr-4 text-heading-color text-md font-medium"
      :class="{ 'opacity-25': live }"
    >
      Test
    </p>
    <GenericToggle
      :active="live"
      @toggle="toggle"
    />
    <p
      class="pl-4 text-heading-color text-md font-medium"
      :class="{ 'opacity-25': !live }"
    >
      Live
    </p>
  </div>
</template>
