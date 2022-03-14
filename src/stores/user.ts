import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '@/interfaces/entities/user';
import { useAuthenticationTokenStorage, useIdStorage, useEmailStorage } from '@/services/storage';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { LogInOptions, SignUpOptions } from '@/interfaces/options/account';
import { OptionalAuthenticationHeaders } from '@/interfaces/utilities/authentication';

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: {
      authenticationToken: useAuthenticationTokenStorage(),
      id: useIdStorage(),
      email: useEmailStorage(),
    },
    user: <Nullable<User>>null,
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
    async signUp({
      email, password, token, name, lastName, company, country,
    }
      : SignUpOptions) {
      const userData = await api.authentication.signUp({
        email, password, token, name, lastName, company, country,
      });
      this.updateUserData(userData);
    },
    async sendConfirmationEmail(email: string) {
      await api.authentication.sendConfirmationEmail(email);
    },
  },
  getters: {
    organizationParams: (state) => {
      if (state.user?.defaultOrganizationId) {
        return {
          currentOrganizationId: state.user.defaultOrganizationId,
        };
      }
      return {};
    },
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
