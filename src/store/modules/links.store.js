import axiosAuth from '../../axios-auth';
import { findBankByCode } from '../../banks-helper';

const initialState = {
  userLinks: [],
  loading: true,
  testModeFilter: false,
};

const getters = {
  getUserLinks(state) {
    return state.testModeFilter ? state.userLinks.filter((link) => link.mode === 'test') : state.userLinks.filter((link) => link.mode === 'live');
  },
};

const mutations = {
  updateUserLinks(state, userLinks) {
    state.userLinks = userLinks.map((link) => ({
      bank: findBankByCode(link.institution.id),
      holderType: link.holder_type,
      holderId: link.holder_id,
      holderName: link.holder_name,
      rut: link.username,
      numberOfAccounts: link.accounts_count,
      linkId: link.id,
      mode: link.mode,
      preventRefresh: link.prevent_refresh,
      active: link.active,
      lastTimeRefreshed: link.last_time_refreshed,
    }));
  },

  removeUserLink(state, linkId) {
    state.userLinks = state.userLinks.filter((link) => link.linkId !== linkId);
  },

  updateLoading(state, status) {
    state.loading = status;
  },

  updateTestModeFilter(state) {
    const currentValue = state.testModeFilter;
    state.testModeFilter = !currentValue;
  },
};

const actions = {

  updateLinksFilter({ commit }) {
    commit('updateTestModeFilter');
  },

  getUserLinks({ commit }) {
    commit('updateLoading', true);
    return new Promise((resolve, reject) => {
      const url = '/internal/v1/links/dashboard';
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
    const url = '/internal/v1/links/dashboard';
    const params = {
      id: linkId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    const headers = this.getters.authHeaders;
    return axiosAuth.delete(`${url}/${params.id}`, { headers, params: { current_organization_id: params.current_organization_id } })
      .then((response) => {
        // TODO: notify link deletion.
        this.commit('removeUserLink', linkId);
        return response;
      })
      .catch((error) => console.log(error));
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
