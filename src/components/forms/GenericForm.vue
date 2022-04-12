<script setup lang="ts">
import {
  ref, computed, ComponentInternalInstance,
} from 'vue';

const validatable = ref<Array<ComponentInternalInstance>>([]);

const register = (component: ComponentInternalInstance) => {
  validatable.value = [...validatable.value, component];
};

const valid = computed(() => {
  const validatableValidity: Array<boolean> = validatable.value.map(
    (value: ComponentInternalInstance) => {
      const exposed = value.exposed as { valid: boolean } | null;
      return exposed?.valid || false;
    },
  );
  return validatableValidity.reduce((previous, current) => previous && current, true);
});

defineExpose({ register, valid });
</script>

<template>
  <form>
    <slot />
  </form>
</template>
