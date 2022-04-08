<script setup lang="ts">
import { ref, computed, ComponentInternalInstance } from 'vue';
import GenericInput from '@/components/forms/GenericInput.vue';

const inputs = ref<Array<ComponentInternalInstance>>([]);

const register = (input: ComponentInternalInstance) => {
  if (input.vnode.type === GenericInput) {
    inputs.value = [...inputs.value, input];
  }
};

const valid = computed(() => {
  const inputsValidity: Array<boolean> = inputs.value.map(
    (value) => {
      const exposed = value.exposed as { valid: boolean } | null;
      return exposed?.valid || false;
    },
  );
  return inputsValidity.reduce((previous, current) => previous && current, true);
});

defineExpose({ register, valid });
</script>

<template>
  <slot />
</template>
