import apiClient from '../../api';

const state = {
  userApiKeys: [],
};

const getters = {
  userApiKeys() {
    return state.userApiKeys;
  },
};

const mutations = {
  updateUserApiKeys(context, userApiKeys) {
    state.userApiKeys = userApiKeys.map((apiKey) => ({
      id: apiKey.id,
      key: apiKey.token,
      isPublic: apiKey.isPublic,
      mode: apiKey.mode,
    }));
  },
};

const actions = {
  getUserApiKeys({ commit }) {
    const headers = this.getters.authHeaders;
    const params = { current_organization_id: this.getters.getDefaultOrganizationId };
    apiClient.apiKeys.index(headers, params).then((response) => {
      commit('updateUserApiKeys', response.data);
    });
  },

  destroyUserApiKey(context, apiKeyId) {
    apiClient.apiKeys.destroy(apiKeyId, this.getters.authHeaders).then(() => {
      // TODO: notify api key deletion.
      this.dispatch('getUserApiKeys');
    });
  },

  async createUserApiKey() {
    return apiClient.apiKeys.create(this.getters.authHeaders).then((response) => {
      this.dispatch('getUserApiKeys');
      return response;
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
