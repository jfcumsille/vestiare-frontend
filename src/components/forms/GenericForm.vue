<script setup lang="ts">
import {
  ref, computed, ComponentInternalInstance,
} from 'vue';
import { Nullable } from '@/interfaces/common';

const validatableComponents = ref<Array<ComponentInternalInstance>>([]);

const register = (component: ComponentInternalInstance) => {
  validatableComponents.value = [...validatableComponents.value, component];
};

const valid = computed(() => {
  const areValidatableComponentsValid: Array<boolean> = validatableComponents.value.map(
    (value: ComponentInternalInstance) => {
      const exposed = value.exposed as Nullable<{ valid: boolean }>;
      return exposed?.valid || false;
    },
  );
  return areValidatableComponentsValid.reduce((previous, current) => previous && current, true);
});

defineExpose({ register, valid });
</script>

<template>
  <form>
    <slot />
  </form>
</template>
