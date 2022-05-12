import { Filter } from '@/interfaces/utilities/table';

export const getFilterValues = <T>(filters: Array<Filter<T>>): Array<T> => (
  filters.filter((filter) => filter.checked).map((filter) => filter.value)
);

export const filterByFilters = <T>(
  array: Array<Record<string, T>>,
  filters: Record<string, Array<unknown>>,
) => array.filter((item) => (
    Object.keys(filters).every(
      (key) => Object.values(filters[key]).indexOf(item[key]) > -1,
    )
  ));
