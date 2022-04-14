import { defineStore, acceptHMRUpdate } from 'pinia';
import { manualSignup } from '@/services/auth0';
import { useAuthenticationTokenStorage, useIdStorage, useEmailStorage } from '@/services/storage';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { User } from '@/interfaces/entities/user';
import { LogInOptions, SignUpOptions } from '@/interfaces/options/account';
import { OptionalAuthenticationHeaders } from '@/interfaces/utilities/authentication';
import { isValidEmail } from '@/utils/email';

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
        const userData = await api.users.get(this.auth.id);
        this.updateUserData(userData);
      }
    },
    async logIn({ email, password, token }: LogInOptions) {
      const userData = await api.sessions.create({ email, password, token });
      this.updateUserData(userData);
    },
    async signUp({
      email, password, token, name, lastName, company, country,
    }: SignUpOptions) {
      manualSignup({
        email, password, name, lastName, company, country,
      });
      // const userData = await api.users.create({
      //   email, password, token, name, lastName, company, country,
      // });
      // this.updateUserData(userData);
    },
    logOut() {
      this.auth.authenticationToken = '';
      this.auth.id = '';
      this.auth.email = '';
    },
    async sendConfirmationEmail(email: string) {
      await api.users.sendConfirmationEmail(email);
    },
    async sendResetPasswordEmail(email: string) {
      await api.users.sendResetPasswordEmail(email);
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
    authenticated: (state) => {
      if (state.auth.authenticationToken && state.auth.id && state.auth.email) {
        return true;
      }
      return false;
    },
    organizationName(state) {
      const name = state.user?.organizations[0].name;
      if (name && !isValidEmail(name)) {
        return state.user?.organizations[0].name;
      }
      return null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
