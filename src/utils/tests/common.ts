export const artificialWait = async (milliseconds = 1) => {
  // The validation takes 1 millisecond, so the validity
  // may be wrong for that milisecond
  await setTimeout(() => null, milliseconds);
};
