export const includes = <SearchType, ArrayElementsType extends SearchType>(
  array: ReadonlyArray<ArrayElementsType>,
  value: SearchType,
): value is ArrayElementsType => array.includes(value as ArrayElementsType);
