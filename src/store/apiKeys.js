import axiosAuth from '../axios-auth';

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
    }));
  },
};

const actions = {
  getUserApiKeys({ commit }) {
    return new Promise((resolve, reject) => {
      const url = '/api/v1/api_keys';
      axiosAuth.get(url, { headers: this.getters.authHeaders })
        .then((response) => {
          commit('updateUserApiKeys', response.data);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
  destroyUserApiKey(context, apiKeyId) {
    const url = `/api/v1/api_keys/${apiKeyId}`;
    axiosAuth.delete(url, { headers: this.getters.authHeaders })
      .then(() => {
        // TODO: notify api key deletion.
        this.dispatch('getUserApiKeys');
      })
      .catch((error) => console.log(error));
  },
  createUserApiKey() {
    return new Promise((resolve, reject) => {
      const url = '/api/v1/api_keys';
      axiosAuth.post(url, {}, { headers: this.getters.authHeaders })
        .then((response) => {
          this.dispatch('getUserApiKeys');
          resolve(response);
        })
        .catch((error) => reject(error.response.data));
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
