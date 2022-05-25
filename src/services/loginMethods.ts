import { useStorage } from '@vueuse/core';
import { Nullable } from '@/interfaces/common';

const methods = {
  google: 'Google', github: 'Github', email: 'Email', username: 'Email',
} as Record<string, string>;

const validLoginMethod = useStorage('valid-login-method', '');
const selectedLoginMethod = useStorage('selected-login-method', '');

export const setValidLoginMethod = (method: string) => {
  validLoginMethod.value = method;
};

export const setSelectedLoginMethod = (method: Nullable<string>) => {
  validLoginMethod.value = null;
  selectedLoginMethod.value = method;
};

export const popValidLoginMethod = () => {
  const validMethod = validLoginMethod.value;
  validLoginMethod.value = null;
  return methods[validMethod];
};

export const popSelectedLoginMethod = () => {
  const selectedMethod = selectedLoginMethod.value;
  selectedLoginMethod.value = null;
  return methods[selectedMethod.split('-')[0]];
};
