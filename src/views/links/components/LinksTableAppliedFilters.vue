<script setup lang="ts">
import {
  computed, ref, watch, onMounted,
} from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { FilterOption } from '@/interfaces/utilities/table';
import { LinkFilterType } from '@/interfaces/utilities/enums';
import {
  addFilter, removeFilter, getIndex, getFilterValues, resetFilters,
} from '@/utils/table';
import TableAppliedFilters from '@/components/table/TableAppliedFilters.vue';

const $t = useTranslation('views.links');
const linksStore = useLinksStore();
const emit = defineEmits<{
  (e: 'apply', filters: Record<string, Array<boolean>>): void,
}>();

const filters = ref([]);

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

const activeAppliedFilter = computed(() => (
  {
    label: LinkFilterType.Active,
    values: activeFilters.value,
    open: linksStore.openedActive,
  }
));
const passwordAppliedFilter = computed(() => (
  {
    label: LinkFilterType.Password,
    values: passwordFilters.value,
    open: linksStore.openedPassword,
  }
));

const toggleFilter = (label: string, open: boolean) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === LinkFilterType.Active) {
    linksStore.openedActive = open;
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
  if (label === LinkFilterType.Password) {
    linksStore.openedPassword = open;
    addFilter(index, passwordAppliedFilter.value, filters.value);
  }
};

const applyFilter = () => {
  const filterValues = {
    active: activeFilterSelectedValues.value,
    preventRefresh: passwordFilterSelectedValues.value,
  };
  emit('apply', filterValues);
};

const deleteFilter = async (label: string) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === LinkFilterType.Active) {
    linksStore.openedActive = false;
    activeFilters.value = resetFilters(activeFilters.value);
  }
  if (label === LinkFilterType.Password) {
    linksStore.openedPassword = false;
    passwordFilters.value = resetFilters(passwordFilters.value);
  }

  applyFilter();
};

watch(() => linksStore.openedActive, () => {
  if (linksStore.openedActive) {
    const index = getIndex(LinkFilterType.Active as string, filters.value);
    removeFilter(index, filters.value);
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
});

watch(() => linksStore.openedPassword, () => {
  if (linksStore.openedPassword) {
    const index = getIndex(LinkFilterType.Password as string, filters.value);
    removeFilter(index, filters.value);
    addFilter(index, passwordAppliedFilter.value, filters.value);
  }
});

onMounted(async () => {
  await linksStore.updateFilters({});
});
</script>

<template>
  <TableAppliedFilters
    :applied-filters="filters"
    @toggle="toggleFilter"
    @delete="deleteFilter"
    @apply="applyFilter"
  />
</template>
