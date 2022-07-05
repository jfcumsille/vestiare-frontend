import type { SupportedLocales } from '@/composables/locale';

export const formatDate = (dateString: string, locale?: SupportedLocales) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { dateStyle: 'medium' });
};

export const formatTime = (dateString: string, locale?: SupportedLocales) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale);
};
