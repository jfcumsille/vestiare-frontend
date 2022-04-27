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

const emit = defineEmits<{
  (e: 'update:search', value: string): void,
  (e: 'select-active-filter', value: string): void,
  (e: 'select-password-filter', value: string): void,
  (e: 'toggle-live'): void,
}>();

const $t = useTranslation('views.links.filters');

const onInput = ($event: Event) => {
  emit('update:search', ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="flex my-auto items-center">
    <div class="flex my-auto mr-6">
      <p
        class="pr-4 text-body-color text-md font-medium"
        :class="{ 'opacity-25': props.live }"
      >
        Test
      </p>
      <GenericToggle
        :active="props.live"
        @toggle="() => emit('toggle-live')"
      />
      <p
        class="pl-4 text-body-color text-md font-medium"
        :class="{ 'opacity-25': !props.live }"
      >
        Live
      </p>
    </div>
    <SearchBar
      :placeholder="$t('searchBarPlaceholder')"
      :model-value="props.search"
      @input="onInput"
    />
    <GenericDropDown
      class="ml-4"
      :text-prefix="$t('active.label')"
      :selected="props.activeFilter"
      :options="props.activeOptions"
      @select="(value: string) => emit('select-active-filter', value)"
    />
    <GenericDropDown
      class="ml-4 my-auto"
      :text-prefix="$t('password.label')"
      :selected="props.passwordFilter"
      :options="props.passwordOptions"
      @select="(value: string) => emit('select-password-filter', value)"
    />
  </div>
</template>
