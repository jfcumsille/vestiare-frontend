import type { FilterOption } from '@/interfaces/utilities/table';

export const getFilterValues = <FilterValueType>(
  filters: Array<FilterOption<FilterValueType>>,
): Array<FilterValueType> => (
    filters.filter((filter) => filter.checked).map((filter) => filter.value)
  );

export const resetFilters = <FilterValueType>(
  array: Array<FilterOption<FilterValueType>>,
) => (
    array.map((filterOption) => {
      const item = { ...filterOption };
      item.checked = false;
      return item;
    })
  );

export const hasFilters = (filters: Record<string, Array<unknown>>) => {
  let hasFiltersApplied = false;
  Object.keys(filters).forEach((key) => {
    if (filters[key].length !== 0) {
      hasFiltersApplied = true;
    }
  });
  return hasFiltersApplied;
};
