<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: () => undefined,
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="relative">
    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
      <svg
        class="w-5 h-5 text-body-color"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="
            M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
            4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z
          "
        clip-rule="evenodd"
      /></svg>
    </div>
    <input
      type="text"
      class="
          bg-light-gray border border-border-color text-heading-color text-sm rounded-lg
          focus:outline-none focus:ring-1 block w-80 pl-10 p-2.5
          focus:ring-primary-focus focus:border-primary-border
        "
      :placeholder="props.placeholder"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="onInput"
    >
  </div>
</template>
