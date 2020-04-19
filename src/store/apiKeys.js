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
    const url = process.env.VUE_APP_USER_API_KEYS_ROUTE;
    axiosAuth.get(url, { headers: this.getters.authHeaders })
      .then((response) => { commit('updateUserApiKeys', response.data); })
      .catch((error) => console.log(error));
  },
  createUserApiKey() {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_USER_API_KEYS_ROUTE;
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
