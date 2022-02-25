import { useStorage } from '@vueuse/core';

// Authentication
export const useAuthenticationTokenStorage = () => useStorage('authenticationToken', '');
export const useIdStorage = () => useStorage('id', '');
export const useEmailStorage = () => useStorage('email', '');
export const useDefaultOrganizationIdStorage = () => useStorage('defaultOrganizationId', '');
