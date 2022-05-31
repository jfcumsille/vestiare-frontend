import type { Filter } from '@/interfaces/utilities/table';

export const getFilterValues = <FilterValueType>(
  filters: Array<Filter<FilterValueType>>,
): Array<FilterValueType> => (
    filters.filter((filter) => filter.checked).map((filter) => filter.value)
  );

export const filterByFilters = <ElementType extends Record<string, unknown>, FilterValueType>(
  array: Array<ElementType>,
  filters: Record<string, Array<FilterValueType>>,
) => array.filter((item) => (
    Object.keys(filters).every(
      (key) => Object.values(filters[key]).indexOf(item[key] as FilterValueType) > -1,
    )
  ));
