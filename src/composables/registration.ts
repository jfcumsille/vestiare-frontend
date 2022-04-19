import { getCurrentInstance } from 'vue';

export interface RegistrationHookOptions {
  skipRegistration?: boolean
}

export const useRegistration = (options?: RegistrationHookOptions) => {
  const { skipRegistration = false } = options || {};
  const register = () => {
    const instance = getCurrentInstance();
    let parent = instance?.parent;
    while (parent) {
      if (parent?.exposed?.register) {
        parent.exposed.register(instance);
        return;
      }
      parent = parent.parent;
    }
  };

  if (!skipRegistration) {
    register();
  }

  return { register };
};
