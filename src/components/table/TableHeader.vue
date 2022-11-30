<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { Mode } from '@/interfaces/utilities/enums';

const configStore = useConfigStore();
</script>

<template>
  <th
    scope="col"
    class="
      py-3 px-4 text-sm text-left text-body-color
      font-medium capitalize min-w-max whitespace-nowrap
    "
    :class="configStore.mode === Mode.Live
      ? 'bg-primary-main text-white'
      : 'bg-light-blue text-heading-color'"
  >
    <slot />
  </th>
</template>
