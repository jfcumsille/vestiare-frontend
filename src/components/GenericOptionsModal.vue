<script setup lang="ts">
import { ButtonType, JustifyType } from '@/interfaces/utilities/enums';
import GenericButton from './GenericButton.vue';

const props = withDefaults(defineProps<{
  options: Array<{label: string, action: string, iconName?: string}>,
  alignRight: boolean,
}>(), {
  alignRight: false,
});

const emit = defineEmits<{(e: 'select', selected: string): void }>();

const handleClick = (option: string) => {
  emit('select', option);
};

</script>
<template>
  <div
    class="
      absolute mt-6 items-start
      bg-white rounded-lg drop-shadow-md flex flex-col
    "
    :class="{'right-0': alignRight}"
  >
    <GenericButton
      v-for="option in props.options"
      :key="option.label"
      :text="option.label"
      :type="ButtonType.Text"
      class="bg-white hover:bg-light-gray capitalize items-start w-full"
      :icon-name="option.iconName"
      :justify="JustifyType.Start"
      @click="() => handleClick(option.action)"
    />
  </div>
</template>
