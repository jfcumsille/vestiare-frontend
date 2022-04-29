<script setup lang="ts">
import { useTranslation } from '@/locales';
import GenericDropDown from '@/components/GenericDropDown.vue';
import SearchBar from './SearchBar.vue';

const props = defineProps<{
  search: string,
  activeFilter: string,
  activeOptions: Array<string>,
  passwordFilter: string,
  passwordOptions: Array<string>,
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void,
  (e: 'select-active-filter', value: string): void,
  (e: 'select-password-filter', value: string): void,
}>();

const $t = useTranslation('views.links.filters');

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
    <div class="flex ml-4 space-x-4">
      <GenericDropDown
        :text-prefix="$t('active.label')"
        :selected="props.activeFilter"
        :options="props.activeOptions"
        @select="(value: string) => emit('select-active-filter', value)"
      />
      <GenericDropDown
        :text-prefix="$t('password.label')"
        :selected="props.passwordFilter"
        :options="props.passwordOptions"
        @select="(value: string) => emit('select-password-filter', value)"
    />
    </div>
  </div>
</template>
