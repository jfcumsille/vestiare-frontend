import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
    authHeaders(state) {
      return { Authorization: state.auth.idToken, 'X-User-Email': state.auth.email };
    },
  },
  mutations: {
  },
  actions: {
  },
  modules,
});
