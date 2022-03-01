import { defineStore, acceptHMRUpdate } from 'pinia';
import { IUser } from '@/interfaces/entities/user';
import {
  useAuthenticationTokenStorage, useIdStorage, useEmailStorage, useDefaultOrganizationIdStorage,
} from '@/services/storage';
import * as api from '@/api';
import { ILogInOptions } from '@/interfaces/options/logIn';
import { IOptionalAuthenticationHeaders } from '@/interfaces/utilities/authentication';

export const useUserStore = defineStore('user', {
  state: () => ({
    authenticationToken: useAuthenticationTokenStorage(),
    id: useIdStorage(),
    email: useEmailStorage(),
    defaultOrganizationId: useDefaultOrganizationIdStorage(),
  }),
  actions: {
    updateUserData(userData: IUser) {
      this.authenticationToken = userData.authenticationToken;
      this.id = userData.id;
      this.email = userData.email;
      this.defaultOrganizationId = userData.defaultOrganizationId;
    },
    async logIn({ email, password, token }: ILogInOptions) {
      const userData = await api.authentication.logIn({ email, password, token });
      this.updateUserData(userData);
    },
    async updateUser() {
      const userData = await api.user.get(this.id);
      this.updateUserData(userData);
    },
  },
  getters: {
    authenticationHeaders: (state): IOptionalAuthenticationHeaders => {
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
