import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '@/api/interfaces/user';
import { useAuthenticationTokenStorage, useIdStorage, useEmailStorage } from '@/services/storage';
import { authentication, user } from '@/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    authenticationToken: useAuthenticationTokenStorage(),
    id: useIdStorage(),
    email: useEmailStorage(),
  }),
  actions: {
    updateUserData(userData: User) {
      this.authenticationToken = userData.authenticationToken;
      this.id = userData.id;
      this.email = userData.email;
    },
    async logIn({ email, password, token }: { email: string, password: string, token: string }) {
      const userData = await authentication.logIn({ email, password, token });
      this.updateUserData(userData);
    },
    async updateUser() {
      const userData = await user.getUser({ userId: this.id });
      this.updateUserData(userData);
    },
  },
  getters: {
    authenticationHeaders: (state): { Authorization: string, 'X-User-Email': string; } | Record<string, never> => {
      if (state.authenticationToken && state.email) {
        return {
          Authorization: state.authenticationToken,
          'X-User-Email': state.email,
        };
      }
      return {};
    },
    authenticated: (state) => state.authenticationToken && state.email,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
