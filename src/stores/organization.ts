import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { Organization } from '@/interfaces/entities/organization';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    loading: false,
    organization: <Nullable<Organization>>null,
  }),
  actions: {
    async loadOrganization() {
      this.loading = true;
      const organizationData = await api.organization.get();
      this.organization = organizationData;
      this.loading = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot));
}
