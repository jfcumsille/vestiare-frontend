import { computed } from 'vue';
import { useNavigatorLanguage, useSessionStorage } from '@vueuse/core';
import { includes } from '@/utils/arrays';

const LOCALE_KEY = 'locale';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'es'] as const;

export type SupportedLocales = typeof SUPPORTED_LOCALES[number];

const getDefaultLocale = () => {
  const { language } = useNavigatorLanguage();
  const defaultLocale = computed<SupportedLocales>(() => {
    const locale = (language.value || '').split('-')[0].toLowerCase();
    return includes(SUPPORTED_LOCALES, locale) ? locale : DEFAULT_LOCALE;
  });
  return { defaultLocale };
};

export const useLocale = () => {
  const { defaultLocale } = getDefaultLocale();
  const locale = useSessionStorage<SupportedLocales>(LOCALE_KEY, defaultLocale.value);
  const changeLocale = (newLocale: SupportedLocales) => {
    locale.value = newLocale;
  };

  return { locale, changeLocale };
};
