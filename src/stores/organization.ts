import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { Json } from '@/interfaces/utilities/json';
import { HolderType, Product } from '@/interfaces/utilities/enums';
import { OrganizationFull } from '@/interfaces/entities/organization';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { isProductAvailable } from '@/utils/organization';

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
    async updateOrganization(data: Json) {
      if (this.organization) {
        try {
          this.loading = true;
          const updatedOrg = await api.organization.update(this.organization.id, data);
          this.organization = updatedOrg;
        } finally {
          this.loading = false;
        }
      }
    },
  },
  getters: {
    isOnDemandAvailable: (state) => {
      if (state.organization && state.organization.refreshPolicies) {
        return state.organization?.refreshPolicies?.includes('on_demand');
      }
      return false;
    },
    isChargesAvailable: (state) => {
      if (state.organization) {
        const products = state.organization.organizationProducts;
        return isProductAvailable(Product.Charges, HolderType.Individual, products)
        || isProductAvailable(Product.Charges, HolderType.Business, products);
      }
      return false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot));
}
