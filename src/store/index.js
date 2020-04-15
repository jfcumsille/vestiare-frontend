import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem('idToken') || '',
    userId: localStorage.getItem('userId') || '',
    email: localStorage.getItem('email') || '',
    userLinks: [],
  },
  getters: {
    userLinks(state) {
      return state.userLinks;
    },
    isUserLoggedIn(state) {
      return !!state.idToken && !!state.userId;
    },
    retrieveSessionFromStorage() {
      return {
        idToken: localStorage.getItem('idToken'),
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
      };
    },
    authHeaders(state) {
      return { Authorization: state.idToken, 'X-User-Email': state.email };
    },
  },
  mutations: {
    saveSessionToStorage(userData) {
      localStorage.setItem('idToken', userData.idToken);
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('email', userData.email);
    },
    saveSessionToStore(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
      state.email = userData.email;
    },
    saveSession(context, userData) {
      this.commit('saveSessionToStore', userData);
      this.commit('saveSessionToStorage', userData);
    },
    updateUserLinks(state, userLinks) {
      state.userLinks = userLinks.map((link) => ({
        bankName: link.institution.name,
        holderType: link.holder_type,
        rut: link.username,
        numberOfAccounts: link.accounts.length,
        linkId: link.id,
      }));
    },
  },
  actions: {
    tryToLoginFromStorage({ commit }) {
      const userData = this.getters.retrieveSessionFromStorage;
      if (userData) { commit('saveSessionToStore', userData); }
    },
    getUserLinks({ commit }) {
      const url = process.env.VUE_APP_USER_LINKS_ROUTE;
      axiosAuth.get(url, { headers: this.getters.authHeaders })
        .then((response) => { commit('updateUserLinks', response.data); })
        .catch((error) => console.log(error.response.data));
    },
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
              email: response.data.email,
            };
            commit('saveSession', userData);
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
              email: response.data.email,
            };
            commit('saveSession', userData);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {
  },
});
