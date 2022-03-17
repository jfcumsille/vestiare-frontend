import { Router } from 'vue-router';
import { useStorage } from '@vueuse/core';

const REDIRECTION_STORE_KEY = 'redirection-location';

export const useRedirectionStorage = () => useStorage(REDIRECTION_STORE_KEY, '/');

export const storeRedirection = (to: string) => {
  const redirection = useRedirectionStorage();
  redirection.value = to;
};

export const generateRedirectionContent = () => {
  const redirectionRef = useRedirectionStorage();
  const redirection = redirectionRef.value;
  redirectionRef.value = null;
  return { path: redirection };
};

export const toStoredRedirectionOrHome = (router: Router) => {
  router.push(generateRedirectionContent());
};
