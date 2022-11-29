import type { FilterOption, Filter } from '@/interfaces/utilities/table';

export const getFilterValues = <FilterValueType>(
  filters: Array<FilterOption<FilterValueType>>,
): Array<FilterValueType> => (
    filters.filter((filter) => filter.checked).map((filter) => filter.value)
  );

export const getIndex = <FilterOptionType>(
  label: string,
  array: Array<Filter<FilterOptionType>>,
) => (array.map((value) => value.label).indexOf(label));

export const addFilter = <FilterOptionType>(
  index: number,
  item: Filter<FilterOptionType>,
  array: Array<Filter<FilterOptionType>>,
) => {
  if (index !== -1) {
    array.splice(index, 0, item);
  } else {
    array.push(item);
  }
};

export const removeFilter = <FilterOptionType>(
  index: number,
  array: Array<Filter<FilterOptionType>>,
) => {
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const resetFilters = <FilterValueType>(
  array: Array<FilterOption<FilterValueType>>,
) => (
    array.map((filterOption) => {
      const item = { ...filterOption };
      item.checked = false;
      return item;
    })
  );
