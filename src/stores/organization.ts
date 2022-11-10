import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { Json } from '@/interfaces/utilities/json';
import { HolderType, Product, Role } from '@/interfaces/utilities/enums';
import { OrganizationFull } from '@/interfaces/entities/organization';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { OrganizationUserCreationOptions } from '@/interfaces/options/organizationUser';
import { isProductAvailable } from '@/utils/organization';
import { useUserStore } from './user';

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
    async inviteMember(data: OrganizationUserCreationOptions) {
      const organizationUser = await api.organizationUsers.create(data);
      this.organizationUsers = [...this.organizationUsers, organizationUser];
    },
    async updateOrganizationUser(organizationUser: OrganizationUser, data: Json) {
      if (!this.organizationUsers.includes(organizationUser)) {
        throw new Error('Invalid Organization User');
      }
      const index = this.organizationUsers.indexOf(organizationUser);
      const updatedOrganizationUser = await api.organizationUsers.update(organizationUser.id, data);
      this.organizationUsers[index] = updatedOrganizationUser;
    },
    async deleteOrganizationUser(organizationUser: OrganizationUser) {
      if (!this.organizationUsers.includes(organizationUser)) {
        throw new Error('Invalid Organization User');
      }
      const index = this.organizationUsers.indexOf(organizationUser);
      await api.organizationUsers.remove(organizationUser.id);
      this.organizationUsers.splice(index, 1);
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
    isCurrentUserAdmin: (state) => {
      const userStore = useUserStore();
      const userEmail = userStore.user?.email;
      const organizationUser = state.organizationUsers.find(
        (user: OrganizationUser) => user.email === userEmail,
      );
      return organizationUser?.role === Role.Admin;
    },
    adminsCount: (state) => state.organizationUsers.filter((organizationUser) => organizationUser.role === 'admin').length,
    showPaymentsTab: (state) => {
      const localhostPopiOrganization = 'org_9w5NjMqpFpZ7BdYK';
      const stagingFintocOrganization = 'org_90BVpMQ2FYOvno8J';
      const productionFintocOrganization = '2WgKNkOmFw1MamyV';
      const allowedOrgs = [
        localhostPopiOrganization,
        stagingFintocOrganization,
        productionFintocOrganization,
      ];
      if (state.organization) {
        return allowedOrgs.includes(state.organization.id);
      }
      return false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot));
}
