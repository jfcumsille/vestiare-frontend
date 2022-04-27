<script setup lang="ts">
import GenericToggle from '@/components/GenericToggle.vue';

const props = defineProps<{ live: boolean }>();

const emit = defineEmits<{
  (e: 'toggle-live'): void,
}>();
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
      :active="props.live"
      @toggle="() => emit('toggle-live')"
    />
    <p
      class="pl-4 text-heading-color text-md font-medium"
      :class="{ 'opacity-25': !live }"
    >
      Live
    </p>
  </div>
</template>
