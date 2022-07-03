import i18next from 'i18next';
import { useLocale } from '@/composables/locale';
import en from './en';
import es from './es';

const { locale } = useLocale();

export const useTranslation = (prefix: string) => i18next.getFixedT(null, null, prefix);

export const setupLocales = () => i18next.init({
  lng: locale.value,
  resources: {
    en,
    es,
  },
});
