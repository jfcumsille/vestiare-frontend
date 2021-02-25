import axiosAuth from '../../axios-auth';
import { findBankByCode } from '../../banks-helper';

const parse = require('parse-link-header');

const initialState = {
  userLiveLinks: [],
  userTestLinks: [],
  testPagination: {},
  livePagination: {},
  loading: true,
  mode: 'live',
};

const getters = {
  getLinks(state) {
    return state.mode === 'live' ? state.userLiveLinks : state.userTestLinks;
  },

  getPagination(state) {
    return state.mode === 'live' ? state.livePagination : state.testPagination;
  },
};

const mutations = {
  updateUserLinks(state, { userLinks, mode }) {
    const links = userLinks.map((link) => ({
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
    if (mode === 'test') {
      state.userTestLinks = links;
    }
    if (mode === 'live') {
      state.userLiveLinks = links;
    }
  },

  removeUserLink(state, { linkId, mode }) {
    if (mode === 'live') {
      state.userLiveLinks = state.userLiveLinks.filter((link) => link.linkId !== linkId);
    }
    if (mode === 'test') {
      state.userTestLinks = state.userTestLinks.filter((link) => link.linkId !== linkId);
    }
  },

  updateUserLink(state, {
    linkId, key, active, preventRefresh,
  }) {
    const updatedLink = state[key].find((link) => link.linkId === linkId);
    state[key] = state[key].map((link) => (link.linkId !== linkId ? link : {
      ...updatedLink,
      active,
      preventRefresh,
    }));
  },

  updateLoading(state, status) {
    state.loading = status;
  },

  updateMode(state) {
    const modeValue = state.mode === 'test' ? 'live' : 'test';
    state.mode = modeValue;
  },

  updatePagination(state, { mode, currentPage, apiPagination }) {
    if (mode === 'test') {
      state.testPagination = { currentPage, lastPage: Number(apiPagination.last.page) };
    }
    if (mode === 'live') {
      state.livePagination = { currentPage, lastPage: Number(apiPagination.last.page) };
    }
  },
};

const actions = {

  updateLinksMode({ commit }) {
    commit('updateMode');
  },

  async getUserLinks({ commit }, { page, mode }) {
    return new Promise((resolve) => {
      const url = `/internal/v1/links/dashboard?per_page=50&page=${page}&mode=${mode}`;
      const queryParams = { current_organization_id: this.getters.getDefaultOrganizationId };
      const { authHeaders } = this.getters;
      axiosAuth.get(url, { headers: { ...authHeaders }, params: queryParams })
        .then((response) => {
          const apiPagination = parse(response.headers.link);
          commit('updatePagination', { mode, currentPage: page, apiPagination });
          commit('updateUserLinks', { userLinks: response.data, mode });
          commit('updateLoading', false);
          resolve();
        });
    });
  },

  async destroyUserLink(context, { linkId, mode }) {
    const url = '/internal/v1/links/dashboard';
    const params = {
      id: linkId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    const headers = this.getters.authHeaders;
    return axiosAuth.delete(`${url}/${params.id}`, { headers, params: { current_organization_id: params.current_organization_id } })
      .then((response) => {
        // TODO: notify link deletion.
        this.commit('removeUserLink', { linkId, mode });
        return response;
      })
      .catch((error) => console.log(error));
  },

  async updateUserLink(context, {
    linkId, mode, active, preventRefresh,
  }) {
    const url = '/internal/v1/links/dashboard';
    const params = {
      id: linkId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    const formData = { link_data: { active, prevent_refresh: preventRefresh } };
    const headers = this.getters.authHeaders;
    return axiosAuth.put(`${url}/${params.id}`, formData, { headers, params })
      .then((response) => {
        const linksStateKey = mode === 'test' ? 'userTestLinks' : 'userLiveLinks';
        this.commit('updateUserLink', {
          linkId, key: linksStateKey, active, preventRefresh,
        });
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
