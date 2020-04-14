import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.idToken && !!state.userId;
    },
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
  },
  actions: {
    logIn({ commit }, formData) {
      return new Promise((resolve, reject) => {
        const payload = {
          email: formData.email,
          password: formData.password,
        };
        const url = process.env.VUE_APP_SIGN_IN_ROUTE;
        axiosAuth.post(url, payload)
          .then((response) => {
            const userData = {
              idToken: response.data.authentication_token,
              userId: response.data.id,
            };
            commit('authUser', userData);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    signUp({ commit }, formData) {
      return new Promise((resolve, reject) => {
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const url = process.env.VUE_APP_SIGN_UP_ROUTE;
        axiosAuth.post(url, payload)
          .then((response) => {
            const userData = {
              idToken: response.data.authentication_token,
              userId: response.data.id,
            };
            commit('authUser', userData);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {
  },
});
