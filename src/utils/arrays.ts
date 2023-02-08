export const includes = <SearchType, ArrayElementsType extends SearchType>(
  array: ReadonlyArray<ArrayElementsType>,
  value: SearchType,
): value is ArrayElementsType => array.includes(value as ArrayElementsType);

export const add = <ArrayType>(
  item: ArrayType,
  array: Array<ArrayType>,
) => {
  if (!array.includes(item)) {
    array.push(item);
  }
};

export const remove = <ArrayType>(
  item: ArrayType,
  array: Array<ArrayType>,
) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const getOrder = <ArrayType>(
  item: ArrayType,
  array: Array<ArrayType>,
) => {
  const index = array.indexOf(item);
  if (index > -1) {
    return `order-${index + 1}`;
  }
  return 'order-last';
};
