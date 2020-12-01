import apiClient from '../../api';

export default {
  state: {
    show: false,
    currentStep: 0,
    isProgrammer: null,
    useCase: null,
    mode: null,
    accounts: null,
    link: null,
    apiKey: null,
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
    fetchAccounts({ commit, state }, payload) {
      const linkToken = state.link.temporaryLinkToken;
      apiClient.accounts.get(linkToken, payload).then((response) => {
        commit('setAccounts', { accounts: response.data });
      });
    },
  },
};
