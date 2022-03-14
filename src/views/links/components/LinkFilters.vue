<script setup lang="ts">
import { useTranslation } from '@/locales';
import GenericToggle from '@/components/GenericToggle.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import SearchBar from './SearchBar.vue';

const props = defineProps<{
  search: string,
  activeFilter: string,
  activeOptions: Array<string>,
  passwordFilter: string,
  passwordOptions: Array<string>,
  live: boolean,
}>();

const $t = useTranslation('views.links.filters');

const emit = defineEmits<{
  (e: 'update:search', value: string): void,
  (e: 'select-active-filter', value: string): void,
  (e: 'select-password-filter', value: string): void,
  (e: 'toggle-live'): void,
}>();

const onInput = ($event: Event) => {
  emit('update:search', ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="flex my-auto">
    <SearchBar
      :placeholder="$t('searchBarPlaceholder')"
      :model-value="props.search"
      @input="onInput"
    />
    <GenericDropDown
      class="ml-4 my-auto"
      translation-namespace="views.links.filters.active"
      :name="$t('active.label')"
      :selected="$props.activeFilter"
      :options="$props.activeOptions"
      :show-name="true"
      text-color="white"
      bg-color="blue-700"
      bg-hover-color="blue-800"
      focus-ring-color="blue-300"
      @select="(value: string) => $emit('select-active-filter', value)"
    />
    <GenericDropDown
      class="ml-4 my-auto"
      translation-namespace="views.links.filters.password"
      :name="$t('password.label')"
      :selected="$props.passwordFilter"
      :options="$props.passwordOptions"
      :show-name="true"
      text-color="white"
      bg-color="blue-700"
      bg-hover-color="blue-800"
      focus-ring-color="blue-300"
      @select="(value: string) => $emit('select-password-filter', value)"
    />
    <div class="flex my-auto ml-6">
      <p
        class="pr-4 text-gray-900 text-md font-medium"
        :class="{ 'opacity-25': props.live }"
      >
        Test
      </p>
      <GenericToggle
        :active="props.live"
        @toggle="() => emit('toggle-live')"
      />
      <p
        class="pl-4 text-gray-900 text-md font-medium"
        :class="{ 'opacity-25': !props.live }"
      >
        Live
      </p>
    </div>
  </div>
</template>
