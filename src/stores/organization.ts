import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { OrganizationFull } from '@/interfaces/entities/organization';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    loading: false,
    organization: <Nullable<OrganizationFull>>null,
    loadingUsers: false,
    organizationUsers: <Array<OrganizationUser>>[],
  }),
  actions: {
    async loadOrganization() {
      this.loading = true;
      const organizationData = await api.organization.get();
      this.organization = organizationData;
      this.loading = false;
    },
    async loadOrganizationUsers() {
      this.loadingUsers = true;
      const organizationUsersData = await api.organizationUsers.get();
      this.organizationUsers = organizationUsersData;
      this.loadingUsers = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot));
}
