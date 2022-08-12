// The validation takes 1 millisecond, so the validity
// may be wrong for that milisecond
export const artificialWait = async (
  milliseconds = 1,
) => new Promise((resolve: (value: void) => void) => {
  setTimeout(() => resolve(), milliseconds);
});
