import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigatorLanguage, useSessionStorage } from '@vueuse/core';
import { includes } from '@/utils/arrays';

const LOCALE_KEY = 'locale';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'es'] as const;

export type SupportedLocales = typeof SUPPORTED_LOCALES[number];

const getDefaultLocale = () => {
  const { language } = useNavigatorLanguage();
  return computed<SupportedLocales>(() => {
    const locale = (language.value || '').split('-')[0].toLowerCase();
    return includes(SUPPORTED_LOCALES, locale) ? locale : DEFAULT_LOCALE;
  });
};

export const useLocale = () => {
  const defaultLocale = getDefaultLocale();
  return useSessionStorage<SupportedLocales>(LOCALE_KEY, defaultLocale.value);
};

export const useLocaleChange = () => {
  const router = useRouter();
  const locale = useLocale();

  return (newLocale: SupportedLocales) => {
    locale.value = newLocale;
    router.go(0);
  };
};
