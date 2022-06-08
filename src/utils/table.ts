import type { Filter } from '@/interfaces/utilities/table';

export const getFilterValues = <FilterValueType>(
  filters: Array<Filter<FilterValueType>>,
): Array<FilterValueType> => (
    filters.filter((filter) => filter.checked).map((filter) => filter.value));
