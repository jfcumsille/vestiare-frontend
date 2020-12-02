import apiClient from '../../api';

export default {
  state: {
    accounts: null,
    apiKey: null,
    currentStep: 0,
    isProgrammer: null,
    link: null,
    mode: null,
    movements: [],
    show: false,
    useCase: null,
  },
  getters: {
  },
  mutations: {
    updateCurrentStep(state) {
      state.currentStep += 1;
    },
    setInitialOnboarding(state, payload) {
      state.isProgrammer = payload.isProgrammer;
      state.useCase = payload.useCase;
    },
    setOnboardingLink(state, payload) {
      state.link = payload.link;
    },
    setMode(state, payload) {
      state.mode = payload.mode;
    },
    setApiKey(state, payload) {
      state.apiKey = payload.apiKey;
    },
    setAccounts(state, payload) {
      state.accounts = payload.accounts;
    },
    setMovements(state, payload) {
      state.movements = payload.movements;
    },
  },
  actions: {
    nextOnboardingStep({ commit }) {
      commit('updateCurrentStep');
    },
    setOnboarding({ commit }, payload) {
      commit('setInitialOnboarding', payload);
    },
    setOnboardingLink({ commit }, payload) {
      commit('setOnboardingLink', payload);
    },
    setEnvironmentMode({ commit }, payload) {
      commit('setMode', payload);
    },
    fetchApiKeys({ commit, dispatch, state }) {
      apiClient.apiKeys.index(this.getters.authHeaders).then((response) => {
        const apiKey = response.data.find((key) => key.mode === state.mode && !key.isPublic);
        commit('setApiKey', { apiKey });
        dispatch('fetchAccounts', { apiKey: apiKey.token });
      });
    },
    fetchAccounts({ commit, state }, { apiKey }) {
      const linkToken = state.link.temporaryLinkToken;
      apiClient.accounts.get({ linkToken, apiKey }).then((response) => {
        commit('setAccounts', { accounts: response.data });
      });
    },
    fetchMovements({ commit, state }) {
      const linkToken = state.link.temporaryLinkToken;
      const accountId = state.accounts[0].id;
      const apiKey = state.apiKey.token;
      console.log(linkToken, accountId, apiKey);
      return apiClient.movements.get({ linkToken, accountId, apiKey }).then((response) => {
        commit('setMovements', { movements: response.data });
        return response;
      });
    },
  },
};
