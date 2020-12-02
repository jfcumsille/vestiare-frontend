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
    show: null,
    skipped: null,
    useCase: null,
  },
  getters: {
  },
  mutations: {
    updateShowOnboarding(state, payload) {
      state.show = payload.onboarding;
    },
    setOnboardingToFalse(state) {
      state.show = false;
    },
    setOnboardingToSkipped(state) {
      state.skipped = true;
    },
    setNextStep(state) {
      state.currentStep += 1;
    },
    setPreviousStep(state) {
      state.currentStep -= 1;
    },
    setProgrammerOption(state, payload) {
      state.isProgrammer = payload;
    },
    setUseCaseOption(state, payload) {
      state.useCase = payload;
    },
    setOnboardingLink(state, payload) {
      state.link = payload.link;
    },
    setMode(state, payload) {
      state.mode = payload.mode;
    },
    resetLink(state) {
      state.mode = null;
      state.link = null;
      state.accounts = null;
      state.movements = [];
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
    showOnboarding({ commit }) {
      apiClient.onboarding.index(this.getters.authHeaders).then((response) => {
        commit('updateShowOnboarding', response.data);
      });
    },
    skipOnboarding({ commit }) {
      commit('setOnboardingToFalse');
      commit('setOnboardingToSkipped');
    },
    finishOnboarding({ commit }) {
      commit('setOnboardingToFalse');
    },
    nextOnboardingStep({ commit }) {
      commit('setNextStep');
    },
    previousOnboardingStep({ commit }) {
      commit('setPreviousStep');
    },
    updateProgrammerOption({ commit }, payload) {
      commit('setProgrammerOption', payload);
    },
    updateUseCaseOption({ commit }, payload) {
      commit('setUseCaseOption', payload);
    },
    setOnboardingLink({ commit }, payload) {
      commit('setOnboardingLink', payload);
    },
    setEnvironmentMode({ commit }, payload) {
      commit('setMode', payload);
    },
    removeLink({ commit }) {
      commit('resetLink');
    },
    fetchApiKeys({ commit, dispatch, state }) {
      apiClient.apiKeys.index(this.getters.authHeaders).then((response) => {
        const apiKey = response.data.find((key) => key.mode === state.mode && !key.isPublic);
        if (apiKey) {
          commit('setApiKey', { apiKey });
          dispatch('fetchAccounts', { apiKey: apiKey.token });
        } else {
          dispatch('createUserApiKey').then((res) => {
            commit('setApiKey', { apiKey: res.data });
            dispatch('fetchAccounts', { apiKey: res.data.token });
          });
        }
      });
    },
    fetchAccounts({ commit, state }, { apiKey }) {
      const linkToken = state.link.temporaryLinkToken;
      apiClient.accounts.get({ linkToken, apiKey }).then((response) => {
        commit('setAccounts', { accounts: response.data });
      });
    },
    fetchMovements({ commit, state }, payload) {
      const linkToken = state.link.temporaryLinkToken;
      const accountIndex = payload.count % state.accounts.length;
      const accountId = state.accounts[accountIndex].id;
      const apiKey = state.apiKey.token;
      return apiClient.movements.get({ linkToken, accountId, apiKey }).then((response) => {
        commit('setMovements', { movements: response.data });
        return response;
      });
    },
  },
};
