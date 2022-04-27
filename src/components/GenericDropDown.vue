<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import {
  ButtonType,
  SizeType,
  HorizontalPositionType,
  JustifyType,
} from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

const props = withDefaults(defineProps<{
  selected: string,
  options: Array<string>,
  textPrefix?: string,
  size?: SizeType,
  isWidthFull?: boolean,
  justify?: string
}>(), {
  isWidthFull: false,
  size: SizeType.Regular,
  justify: JustifyType.Center,
});

const emit = defineEmits<{(e: 'select', selected: string): void }>();

const opened = ref(false);
const dropDown = ref(null);

const toggle = () => {
  opened.value = !opened.value;
};

const select = (option: string) => {
  emit('select', option);
  opened.value = false;
};

onClickOutside(dropDown, () => {
  opened.value = false;
});

const title = computed(() => {
  if (props.textPrefix) {
    return `${props.textPrefix} - ${props.selected}`;
  }
  return props.selected;
});
</script>

<template>
  <div ref="dropDown">
    <GenericButton
      data-test="drop-down-button"
      :type="ButtonType.Outline"
      :text="title"
      :size="size"
      :justify="JustifyType.Between"
      :is-width-full="isWidthFull"
      icon-name="chevron_down"
      :icon-position="HorizontalPositionType.Right"
      @click="toggle"
    />
    <div
      data-test="drop-down-list"
      class="
        absolute z-10 text-base list-none bg-white rounded cursor-pointer
        divide-y divide-divider-color shadow-lg
      "
      :class="{ 'hidden': !opened }"
    >
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="option"
        >
          <span
            class="block py-2 px-4 text-sm text-body-color font-normal hover:bg-light-gray"
            @click="() => select(option)"
          >
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
