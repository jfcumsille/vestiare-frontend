export const getOrder = <SetType>(
  item: SetType,
  set: Set<SetType>,
) => {
  const index = [...set].indexOf(item);
  if (index > -1) {
    return `order-${index + 1}`;
  }
  return 'order-last';
};
