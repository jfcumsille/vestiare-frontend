import { defineStore, acceptHMRUpdate } from 'pinia';
import { getAuth0Client, manualSignup } from '@/services/auth0';
import * as api from '@/api';
import { isValidEmail } from '@/utils/validations';
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
    async manualSignup({
      email, password, name, lastName, company, country,
    }: SignUpOptions) {
      const user = await manualSignup({
        email, password, name, lastName, company, country,
      });
      await this.createUser({
        id: `auth0|${user.Id}`,
        email: user.email,
        name: user.givenName,
        lastName: user.familyName,
      });
    },
    async createUser({
      id, email, name, lastName,
    }: SignUpOptions) {
      await api.user.create({
        id,
        email,
        name: name || 'pending-name',
        lastName: lastName || 'pending-last-name',
      });
    },
    async logOut() {
      const auth0 = await getAuth0Client();
      this.user = null;
      await auth0.logout({
        returnTo: window.location.origin,
      });
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
    defaultOrganization(state) {
      return state.user?.organizations.find(
        (organization) => organization.id === state.user?.defaultOrganizationId,
      );
    },
    organizationName() {
      const name = this.defaultOrganization?.name;
      if (name && !isValidEmail(name)) {
        return this.defaultOrganization?.name;
      }
      return null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
