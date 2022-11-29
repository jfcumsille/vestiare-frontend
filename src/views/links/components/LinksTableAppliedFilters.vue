<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTranslation } from '@/locales';
import { FilterOption } from '@/interfaces/utilities/table';
import { LinkFilterType } from '@/interfaces/utilities/enums';
import {
  addFilter, removeFilter, getIndex, getFilterValues, resetFilters,
} from '@/utils/table';
import TableAppliedFilters from '@/components/table/TableAppliedFilters.vue';

const $t = useTranslation('views.links');
const emit = defineEmits<{
  (e: 'apply', filters: Record<string, Array<boolean>>): void,
  (e: 'reset', label: LinkFilterType, open: boolean): void,
}>();

const props = defineProps<{
  openedPassword: boolean,
  openedActive: boolean,
}>();

const openedPassword = ref(props.openedPassword);
const openedActive = ref(props.openedActive);

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
    open: openedActive.value,
  }
));
const passwordAppliedFilter = computed(() => (
  {
    label: LinkFilterType.Password,
    values: passwordFilters.value,
    open: openedPassword.value,
  }
));

const toggleFilter = (label: string, open: boolean) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === LinkFilterType.Active) {
    openedActive.value = open;
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
  if (label === LinkFilterType.Password) {
    openedPassword.value = open;
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
    openedActive.value = false;
    activeFilters.value = resetFilters(activeFilters.value);
  }
  if (label === LinkFilterType.Password) {
    openedPassword.value = false;
    passwordFilters.value = resetFilters(passwordFilters.value);
  }

  applyFilter();
};

watch(() => props.openedActive, () => {
  openedActive.value = props.openedActive;
  emit('reset', LinkFilterType.Active, false);
  if (openedActive.value) {
    const index = getIndex(LinkFilterType.Active as string, filters.value);
    removeFilter(index, filters.value);
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
});
watch(() => props.openedPassword, () => {
  openedPassword.value = props.openedPassword;
  emit('reset', LinkFilterType.Password, false);
  if (openedPassword.value) {
    const index = getIndex(LinkFilterType.Password as string, filters.value);
    removeFilter(index, filters.value);
    addFilter(index, passwordAppliedFilter.value, filters.value);
  }
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
