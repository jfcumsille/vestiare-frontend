import { defineStore, acceptHMRUpdate } from 'pinia';
import { getAuth0Client, manualSignup } from '@/services/auth0';
import * as api from '@/api';
import { isValidEmail } from '@/utils/email';
import { Nullable } from '@/interfaces/common';
import { User } from '@/interfaces/entities/user';
import { LogInOptions, SignUpOptions } from '@/interfaces/options/account';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: <Nullable<User>>null,
  }),
  actions: {
    updateUserData(userData: User) {
      this.user = userData;
    },
    async loadUser() {
      const userData = await api.user.get();
      this.user = userData;
    },
    async logIn({ email, password, token }: LogInOptions) {
      const userData = await api.sessions.create({ email, password, token });
      this.user = userData;
    },
    async signUp({
      email, password, name, lastName, company, country,
    }: SignUpOptions) {
      const user = await manualSignup({
        email, password, name, lastName, company, country,
      });
      await this.createUser({
        id: user.Id,
        email: user.email,
        name: user.givenName,
        lastName: user.familyName,
      });
    },
    async createUser({
      id, email, name, lastName,
    }: SignUpOptions) {
      await api.user.create({
        id, email, name, lastName,
      });
    },
    async logOut() {
      const auth0 = await getAuth0Client();
      await auth0.logout({
        returnTo: window.location.origin,
      });
      this.user = null;
    },
    async sendConfirmationEmail(email: string) {
      await api.user.sendConfirmationEmail(email);
    },
    async sendResetPasswordEmail(email: string) {
      await api.user.sendResetPasswordEmail(email);
    },
  },
  getters: {
    authenticated: (state) => !!state.user,
    organizationParams: (state) => {
      if (state.user?.defaultOrganizationId) {
        return {
          currentOrganizationId: state.user.defaultOrganizationId,
        };
      }
      return {};
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
