import i18next from 'i18next';
import en from './en';
import es from './es';

export const useTranslation = (prefix: string) => i18next.getFixedT(null, null, prefix);

export const setupLocales = () => i18next.init({
  lng: 'en',
  resources: {
    en,
    es,
  },
});
