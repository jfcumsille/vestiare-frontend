<script setup lang="ts">
import GenericToggle from '@/components/GenericToggle.vue';
import SearchBar from './SearchBar.vue';
import DropDown from './DropDown.vue';

const $props = defineProps<{
  search: string,
  activeFilter: string,
  activeOptions: Array<string>,
  passwordFilter: string,
  passwordOptions: Array<string>,
  live: boolean,
}>();

const $emit = defineEmits<{(e: 'update:search', value: string): void,
  (e: 'select-active-filter', value: string): void,
  (e: 'select-password-filter', value: string): void,
  (e: 'toggle-live'): void,
}>();

const onInput = ($event: Event) => {
  $emit('update:search', ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="flex my-auto">
    <SearchBar
      placeholder="Search for a user ID"
      :model-value="$props.search"
      @input="onInput"
    />
    <DropDown
      class="ml-4 my-auto"
      name="Active"
      :selected="$props.activeFilter"
      :options="$props.activeOptions"
      @select="(value: string) => $emit('select-active-filter', value)"
    />
    <DropDown
      class="ml-4 my-auto"
      name="Password"
      :selected="$props.passwordFilter"
      :options="$props.passwordOptions"
      @select="(value: string) => $emit('select-password-filter', value)"
    />
    <div class="flex my-auto ml-6">
      <p
        class="pr-4 text-gray-900 text-md font-medium"
        :class="{ 'opacity-25': $props.live }"
      >
        Test
      </p>
      <GenericToggle
        :active="$props.live"
        @toggle="() => $emit('toggle-live')"
      />
      <p
        class="pl-4 text-gray-900 text-md font-medium"
        :class="{ 'opacity-25': !$props.live }"
      >
        Live
      </p>
    </div>
  </div>
</template>
