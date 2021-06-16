import apiClient from '../../api';

const state = {
  userApiKeys: [],
};

const getters = {
  userApiKeys() {
    return state.userApiKeys;
  },
  userSecretKeys() {
    const liveKey = state.userApiKeys.find((apiKey) => !apiKey.isPublic && apiKey.mode === 'live');
    const testKey = state.userApiKeys.find((apiKey) => !apiKey.isPublic && apiKey.mode === 'test');
    return { liveKey: liveKey ? liveKey.key : '', testKey: testKey ? testKey.key : '' };
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
    const params = {
      id: apiKeyId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    const headers = { headers: this.getters.authHeaders };
    apiClient.apiKeys.destroy(headers, params).then(() => {
      // TODO: notify api key deletion.
      this.dispatch('getUserApiKeys');
    });
  },

  async createUserApiKey() {
    const params = { current_organization_id: this.getters.getDefaultOrganizationId };
    const headers = { headers: this.getters.authHeaders };
    return apiClient.apiKeys.create(headers, params).then((response) => {
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
