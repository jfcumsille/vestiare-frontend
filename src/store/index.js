import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
  },
  actions: {
    signUp({ commit }, formData) {
      const payload = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      const url = process.env.SIGN_UP_ROUTE;
      axiosAuth.post(url, payload)
        .then((response) => {
          const userData = { idToken: response.data.idToken, userId: response.data.localId };
          commit('authUser', userData);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {
  },
});
