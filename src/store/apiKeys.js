import apiClient from '../api';

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
      isPublic: apiKey.is_public,
    }));
  },
};

const actions = {
  getUserApiKeys({ commit }) {
    apiClient.apiKeys.index(this.getters.authHeaders).then((response) => {
      commit('updateUserApiKeys', response.data);
    });
  },
  destroyUserApiKey(context, apiKeyId) {
    apiClient.apiKeys.destroy(apiKeyId, this.getters.authHeaders).then(() => {
      // TODO: notify api key deletion.
      this.dispatch('getUserApiKeys');
    });
  },
  createUserApiKey() {
    apiClient.apiKeys.create(this.getters.authHeaders).then(() => {
      this.dispatch('getUserApiKeys');
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
