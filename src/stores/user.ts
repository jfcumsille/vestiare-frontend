import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '@/interfaces/entities/user';
import { useAuthenticationTokenStorage, useIdStorage, useEmailStorage } from '@/services/storage';
import * as api from '@/api';
import { LogInOptions } from '@/interfaces/options/logIn';
import { OptionalAuthenticationHeaders } from '@/interfaces/utilities/authentication';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: {
      authenticationToken: useAuthenticationTokenStorage(),
      id: useIdStorage(),
      email: useEmailStorage(),
    },
    user: <User | null>null,
  }),
  actions: {
    updateUserData(userData: User) {
      this.auth.authenticationToken = userData.authenticationToken;
      this.auth.id = userData.id;
      this.auth.email = userData.email;
      this.user = userData;
    },
    async loadUser() {
      if (this.authenticated) {
        const userData = await api.user.get(this.auth.id);
        this.updateUserData(userData);
      }
    },
    async logIn({ email, password, token }: LogInOptions) {
      const userData = await api.authentication.logIn({ email, password, token });
      this.updateUserData(userData);
    },
  },
  getters: {
    defaultOrganizationId: (state) => state.user?.defaultOrganizationId || '',
    authenticationHeaders: (state): OptionalAuthenticationHeaders => {
      if (state.auth.authenticationToken && state.auth.id && state.auth.email) {
        return {
          Authorization: state.auth.authenticationToken,
          'X-User-Email': state.auth.email,
        };
      }
      return {};
    },
    authenticated: (state) => state.auth.authenticationToken && state.auth.id && state.auth.email,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
