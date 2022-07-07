import type { SupportedLocales } from '@/composables/locale';
import { DateStyle } from '@/interfaces/utilities/enums';

export const formatDate = (
  dateString: string,
  locale?: SupportedLocales,
  style = DateStyle.Medium,
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { dateStyle: style });
};

export const formatTime = (dateString: string, locale?: SupportedLocales) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale);
};
