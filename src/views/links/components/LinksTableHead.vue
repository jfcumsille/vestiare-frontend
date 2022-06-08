<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';
import { Filter } from '@/interfaces/utilities/table';
import { getFilterValues } from '@/utils/table';

const $t = useTranslation('views.links.table');

const emit = defineEmits<{(e: 'update', filterValues: Record<string, Array<boolean>>): void }>();

const activeFilters = ref<Array<Filter<boolean>>>([
  { name: $t('filters.active.options.valid'), value: true, checked: true },
  { name: $t('filters.active.options.invalid'), value: false, checked: true },
]);
const activeFilterSelectedValues = computed(() => getFilterValues(activeFilters.value));

const passwordFilters = ref<Array<Filter<boolean>>>([
  { name: $t('filters.password.options.valid'), value: false, checked: true },
  { name: $t('filters.password.options.invalid'), value: true, checked: true },
]);
const passwordFilterSelectedValues = computed(() => getFilterValues(passwordFilters.value));

const applyFilter = () => {
  emit('update', {
    active: activeFilterSelectedValues.value,
    preventRefresh: passwordFilterSelectedValues.value,
  });
};
</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('headers.institution') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.user') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.business') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.lastRefreshed') }} </div></TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.password')"
        :filters="passwordFilters"
        @apply="applyFilter"
      />
    </TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.active')"
        :filters="activeFilters"
        @apply="applyFilter"
      />
    </TableHeader>
    <TableHeader><div /></TableHeader>
  </TableHead>
</template>
