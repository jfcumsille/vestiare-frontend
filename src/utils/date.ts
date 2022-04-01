export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toDateString();
};
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};
