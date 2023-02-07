<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { FilterOption, LinkFilter } from '@/interfaces/utilities/table';
import { LinkFilterType } from '@/interfaces/utilities/enums';
import { resetFilters, getFilterValues } from '@/utils/table';
import { getOrder } from '@/utils/sets';
import OptionsFilter from '@/components/table/utils/OptionsFilter.vue';

const $t = useTranslation('views.links');
const $tTable = useTranslation('table.filters');

const linksStore = useLinksStore();
const emit = defineEmits<{
  (e: 'apply', filters: LinkFilter): void,
}>();

const passwordFilters = ref<Array<FilterOption<boolean>>>([
  { name: $t('table.filters.password.options.valid'), value: false, checked: false },
  { name: $t('table.filters.password.options.invalid'), value: true, checked: false },
]);
const passwordFilterSelectedValues = computed(() => getFilterValues(passwordFilters.value));

const activeFilters = ref<Array<FilterOption<boolean>>>([
  { name: $t('table.filters.active.options.valid'), value: true, checked: false },
  { name: $t('table.filters.active.options.invalid'), value: false, checked: false },
]);
const activeFilterSelectedValues = computed(() => getFilterValues(activeFilters.value));

const addFilter = (filterType: LinkFilterType) => {
  linksStore.filtersShown.add(filterType);
  linksStore.filtersOpened.add(filterType);
};

const changeOpen = (filterType: LinkFilterType, openValue: boolean) => {
  if (openValue) {
    addFilter(filterType);
  } else {
    linksStore.filtersOpened.delete(filterType);
  }
};

const updateFilters = (filterType: Nullable<LinkFilterType>) => {
  const filterValues: LinkFilter = {
    active: activeFilterSelectedValues.value,
    preventRefresh: passwordFilterSelectedValues.value,
  };
  if (filterType) {
    changeOpen(filterType, false);
  }
  emit('apply', filterValues);
};

const deleteActiveFilter = async () => {
  activeFilters.value = resetFilters(activeFilters.value);
};

const deletePasswordFilter = async () => {
  passwordFilters.value = resetFilters(passwordFilters.value);
};

const deleteFilter = (filterType: LinkFilterType) => {
  linksStore.filtersShown.delete(filterType);
  linksStore.filtersOpened.delete(filterType);
  if (filterType === LinkFilterType.Active) {
    deleteActiveFilter();
  }
  if (filterType === LinkFilterType.Password) {
    deletePasswordFilter();
  }
  updateFilters(null);
};
</script>

<template>
  <div class="flex flex-row space-x-4 min-h-12">
    <div
      v-if="linksStore.filtersShown.size > 0"
      class="min-w-max text-body-color pt-1"
    >
      {{ $tTable('filteredBy') }}
    </div>
    <div class="flex flex-wrap w-full gap-2">
      <OptionsFilter
        v-if="linksStore.filtersShown.has(LinkFilterType.Active)"
        :class="getOrder(LinkFilterType.Active, linksStore.filtersShown)"
        :label="(LinkFilterType.Active as string)"
        :label-type="$t('table.filters.active.labelType')"
        :filters="activeFilters"
        :opened="linksStore.filtersOpened.has(LinkFilterType.Active)"
        @apply="updateFilters(LinkFilterType.Active)"
        @open="changeOpen(LinkFilterType.Active, true)"
        @close="changeOpen(LinkFilterType.Active, false)"
        @delete="deleteFilter(LinkFilterType.Active)"
      />
      <OptionsFilter
        v-if="linksStore.filtersShown.has(LinkFilterType.Password)"
        :class="getOrder(LinkFilterType.Password, linksStore.filtersShown)"
        :label="(LinkFilterType.Password as string)"
        :label-type="$t('table.filters.password.labelType')"
        :filters="passwordFilters"
        :opened="linksStore.filtersOpened.has(LinkFilterType.Password)"
        @apply="updateFilters(LinkFilterType.Password)"
        @open="changeOpen(LinkFilterType.Password, true)"
        @close="changeOpen(LinkFilterType.Password, false)"
        @delete="deleteFilter(LinkFilterType.Password)"
      />
    </div>
  </div>
</template>
