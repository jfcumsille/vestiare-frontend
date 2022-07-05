import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigatorLanguage, useSessionStorage } from '@vueuse/core';
import { includes } from '@/utils/arrays';

const LOCALE_KEY = 'locale';

export enum SupportedLocales {
  En = 'en',
  Es = 'es',
}

export enum SupportedLanguages {
  En = 'English',
  Es = 'Español',
}

const DEFAULT_LOCALE = SupportedLocales.En;

const getDefaultLocale = () => {
  const { language } = useNavigatorLanguage();
  return computed(() => {
    const locale = (language.value || '').split('-')[0].toLowerCase();
    return includes(Object.values(SupportedLocales), locale) ? locale : DEFAULT_LOCALE;
  });
};

export const languageToLocale = (language: SupportedLanguages) => {
  const index = Object.values(SupportedLanguages).indexOf(language);
  const keys = Object.keys(SupportedLocales) as Array<keyof typeof SupportedLocales>;
  return SupportedLocales[keys[index]];
};

export const localeToLanguage = (locale: SupportedLocales) => {
  const index = Object.values(SupportedLocales).indexOf(locale);
  const keys = Object.keys(SupportedLanguages) as Array<keyof typeof SupportedLanguages>;
  return SupportedLanguages[keys[index]];
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
