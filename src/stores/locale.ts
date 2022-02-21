import i18next from 'i18next';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    language: i18next.language,
  }),
  actions: {
    async changeLanguage(language: string) {
      await i18next.changeLanguage(language);
      this.language = i18next.language;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot));
}
