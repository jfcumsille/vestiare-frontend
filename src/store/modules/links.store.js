import axiosAuth from '../../axios-auth';
import { findBankByCode } from '../../banks-helper';

const initialState = {
  userLinks: [],
  loading: true,
};

const getters = {
};

const mutations = {
  updateUserLinks(state, userLinks) {
    state.userLinks = userLinks.map((link) => ({
      bank: findBankByCode(link.institution.id),
      holderType: link.holder_type,
      holderId: link.holder_id,
      rut: link.username,
      numberOfAccounts: link.accounts_count,
      linkId: link.id,
      mode: link.mode,
    }));
  },

  removeUserLink(state, linkId) {
    state.userLinks = state.userLinks.filter((link) => link.linkId !== linkId);
  },

  updateLoading(state, status) {
    state.loading = status;
  },
};

const actions = {
  getUserLinks({ commit }) {
    commit('updateLoading', true);
    return new Promise((resolve, reject) => {
      const url = '/v1/links';
      const queryParams = { current_organization_id: this.getters.getDefaultOrganizationId };
      const { authHeaders } = this.getters;
      axiosAuth.get(url, { headers: authHeaders, params: queryParams }).then((response) => {
        commit('updateUserLinks', response.data);
        commit('updateLoading', false);
        resolve();
      }).catch((error) => reject(error));
    });
  },

  destroyUserLink(context, linkId) {
    const url = '/v1/links';
    const params = {
      id: linkId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    const headers = this.getters.authHeaders;
    return axiosAuth.delete(url, { headers, params })
      .then((response) => {
        // TODO: notify link deletion.
        this.commit('removeUserLink', linkId);
        return response;
      })
      .catch((error) => console.log(error));
  },

  createUserLinkFromWidget(context, payload) {
    const url = 'internal/v1/links/widget';
    return axiosAuth.post(url, payload.formData, { headers: { ...payload.headers } });
  },

  createUserLinkFromDashboard(context, payload) {
    const url = 'internal/v1/links/dashboard';
    return axiosAuth.post(url, payload.formData, { headers: { ...payload.headers } })
      .then((response) => {
        this.dispatch('getUserLinks');
        return response;
      });
  },

  sendNewLinkRequest(context, formData) {
    return new Promise((resolve, reject) => {
      const url = '/v1/user_credentials';
      axiosAuth.post(url, formData, { headers: this.getters.authHeaders })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
