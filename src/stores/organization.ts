import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { Organization } from '@/interfaces/entities/organization';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: <Nullable<Organization>>null,
  }),
  actions: {
    async loadOrganization() {
      const organizationData = await api.organization.get();
      this.organization = organizationData;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot));
}
